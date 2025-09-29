/**
 * 注册表管理系统
 * 负责存储、获取、管理所有正则表达式
 */

import { 
  Registry as IRegistry, 
  RegexPattern, 
  RegexGroupConfig, 
  EnhancedRegexConfig,
  RegexExamples,
  TypeInfo, 
  ConfigOptions,
  GroupFallbackStrategy 
} from '../types/index';

interface InternalConfig {
  groupFallback: GroupFallbackStrategy;
}

interface InternalTypeConfig {
  groups: Record<string, RegExp>;
  default?: string;
  type?: string;
  description?: string;
  examples?: RegexExamples;
}

class Registry {
  private data: Record<string, RegExp | InternalTypeConfig> = {};
  private config: InternalConfig = {
    groupFallback: 'strict'
  };

  constructor(initialData: IRegistry = {}) {
    // 加载初始数据
    if (initialData) {
      this.loadData(initialData);
    }
  }

  /**
   * 加载数据到注册表
   * @param data - 正则表达式数据
   */
  loadData(data: IRegistry): void {
    Object.keys(data).forEach(type => {
      this.add(type, data[type]);
    });
  }

  /**
   * 获取正则表达式
   * @param type - 类型名称
   * @param group - 分组名称
   * @returns 正则表达式
   */
  get(type: string, group: string | null = null): RegExp | null {
    const config = this.data[type];
    if (!config) {
      return null;
    }

    // 如果是直接的RegExp，直接返回
    if (config instanceof RegExp) {
      return config;
    }

    // 如果是分组配置
    if (typeof config === 'object' && this.isGroupConfig(config)) {
      const targetGroup = this._resolveGroup(config, group);
      if (!targetGroup) {
        return null;
      }

      const groupConfig = config.groups[targetGroup];
      if (!groupConfig) {
        return null;
      }

      return groupConfig instanceof RegExp ? groupConfig : null;
    }

    return null;
  }

  /**
   * 添加正则表达式
   * @param type - 类型名称
   * @param pattern - 正则表达式或分组配置
   */
  add(type: string, pattern: RegexPattern): void {
    if (pattern instanceof RegExp) {
      // 直接RegExp
      this.data[type] = pattern;
    } else if (typeof pattern === 'object') {
      // 检查是否为增强配置格式
      if (this.isEnhancedConfig(pattern)) {
        // 增强配置格式
        this.data[type] = {
          groups: { default: pattern.pattern },
          default: 'default',
          description: pattern.description,
          examples: pattern.examples
        };
      } else {
        // 分组配置 - 转换为内部格式
        const groups: Record<string, RegExp> = {};
        const groupConfig = pattern as RegexGroupConfig;
        let configDescription: string | undefined;
        let configExamples: RegexExamples | undefined;
        
        // 提取默认分组和描述
        const defaultGroup = groupConfig.default;
        if ('description' in groupConfig && typeof groupConfig.description === 'string') {
          configDescription = groupConfig.description;
        }
        
        Object.keys(groupConfig).forEach(key => {
          if (key === 'default' || key === 'description') return;
          
          const value = groupConfig[key];
          if (value instanceof RegExp) {
            groups[key] = value;
          } else if (typeof value === 'object' && value && this.isEnhancedConfig(value)) {
            // 分组中的增强配置
            groups[key] = value.pattern;
            if (!configDescription) configDescription = value.description;
            if (!configExamples) configExamples = value.examples;
          }
        });

        this.data[type] = {
          groups,
          default: defaultGroup,
          description: configDescription,
          examples: configExamples
        };
      }
    }
  }

  /**
   * 类型守卫：检查是否为增强配置
   * @private
   */
  private isEnhancedConfig(config: any): config is EnhancedRegexConfig {
    return typeof config === 'object' &&
           config.pattern instanceof RegExp &&
           typeof config.description === 'string' &&
           typeof config.examples === 'object' &&
           Array.isArray(config.examples.valid) &&
           Array.isArray(config.examples.invalid);
  }

  /**
   * 列出所有可用类型和分组
   * @returns 类型列表
   */
  list(): TypeInfo[] {
    return Object.keys(this.data).map(type => {
      const config = this.data[type];
      
      if (config instanceof RegExp) {
        return { type, groups: [] };
      }
      
      if (this.isGroupConfig(config)) {
        return {
          type,
          groups: Object.keys(config.groups),
          default: config.default,
          description: config.description,
          examples: config.examples
        };
      }
      
      return { type, groups: [] };
    });
  }

  /**
   * 设置配置
   * @param options - 配置选项
   */
  setConfig(options: ConfigOptions): void {
    if (options.groupFallback) {
      this.config.groupFallback = options.groupFallback;
    }
  }

  /**
   * 批量注入（合并模式）
   * @param partial - 部分配置
   */
  inject(partial: IRegistry): void {
    Object.keys(partial).forEach(type => {
      const existing = this.data[type];
      const incoming = partial[type];

      if (!existing) {
        // 新类型，直接添加
        this.add(type, incoming);
      } else if (existing instanceof RegExp && incoming instanceof RegExp) {
        // 都是RegExp，覆盖
        this.data[type] = incoming;
      } else if (this.isGroupConfig(existing) && typeof incoming === 'object' && incoming !== null && !(incoming instanceof RegExp)) {
        // 都是对象，合并分组
        const incomingGroups: Record<string, RegExp> = {};
        let incomingDefault: string | undefined;
        
        // 检查是否为增强配置
        if (this.isEnhancedConfig(incoming)) {
          // 增强配置格式
          incomingGroups.default = incoming.pattern;
          incomingDefault = 'default';
        } else {
          // 分组配置格式
          const groupConfig = incoming as RegexGroupConfig;
          incomingDefault = groupConfig.default;
          
          Object.keys(groupConfig).forEach(key => {
            if (key === 'default' || key === 'description') return;
            
            const value = groupConfig[key];
            if (value instanceof RegExp) {
              incomingGroups[key] = value;
            } else if (typeof value === 'object' && value && this.isEnhancedConfig(value)) {
              incomingGroups[key] = value.pattern;
            }
          });
        }
        
        this.data[type] = {
          ...existing,
          groups: { ...existing.groups, ...incomingGroups },
          default: incomingDefault || existing.default
        };
      } else {
        // 类型不匹配，覆盖
        this.add(type, incoming);
      }
    });
  }

  /**
   * 使用外部注册表（替换模式）
   * @param registry - 完整注册表
   */
  use(registry: IRegistry): void {
    this.data = {};
    this.loadData(registry);
  }

  /**
   * 类型守卫：检查是否为分组配置
   * @private
   */
  private isGroupConfig(config: RegExp | InternalTypeConfig): config is InternalTypeConfig {
    return typeof config === 'object' && 
           config !== null && 
           !(config instanceof RegExp) && 
           'groups' in config;
  }

  /**
   * 解析分组名称
   * @private
   * @param config - 类型配置
   * @param requestedGroup - 请求的分组
   * @returns 解析后的分组名称
   */
  private _resolveGroup(config: InternalTypeConfig, requestedGroup: string | null): string | null {
    // 如果指定了分组，直接使用
    if (requestedGroup) {
      return requestedGroup;
    }

    // 如果有默认分组，使用默认分组
    if (config.default) {
      return config.default;
    }

    // 如果只有一个分组，自动使用
    const groups = Object.keys(config.groups);
    if (groups.length === 1) {
      return groups[0];
    }

    // 多分组且无默认分组的处理
    if (this.config.groupFallback === 'first') {
      return groups[0];
    }

    // strict模式：抛出错误
    if (this.config.groupFallback === 'strict') {
      throw new Error(`Multiple groups available for type "${config.type || 'unknown'}", please specify one: [${groups.join(', ')}]`);
    }

    return null;
  }
}

export default Registry;
