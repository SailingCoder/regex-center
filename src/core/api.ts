/**
 * 核心API实现
 * 提供 rx.get/test/fmt/add/list/config 等核心功能
 */

import Registry from './registry';
import { 
  IRegexKit, 
  Registry as IRegistry,
  RegexPattern, 
  RegexGroupConfig,
  TypeInfo, 
  ConfigOptions
} from '../types/index';
import { RegexSecurityChecker } from '../utils/security';
import { RegexChain, createChain, ChainOptions, ChainResult } from './chain-api';

class RegexKit implements IRegexKit {
  private registry: Registry;
  private securityEnabled: boolean = true; // 默认启用安全检查

  constructor() {
    this.registry = new Registry();
  }

  /**
   * 解析类型和分组参数
   * 仅支持新语法：'type:group' 格式
   * @private
   */
  private parseTypeAndGroup(typeSpec: string): { type: string; group?: string } {
    if (typeof typeSpec === 'string' && typeSpec.includes(':')) {
      const [type, group] = typeSpec.split(':');
      return { type, group };
    } else {
      return { type: typeSpec };
    }
  }

  /**
   * 安全检查正则表达式
   * @private
   */
  private checkRegexSafety(pattern: RegExp, context: string = ''): boolean {
    if (!this.securityEnabled) {
      return true;
    }

    try {
      const report = RegexSecurityChecker.checkSafety(pattern);
      
      // 记录警告但不阻止使用（除非是严重风险）
      if (report.warnings.length > 0) {
        console.warn(`Regex security warning${context ? ` for ${context}` : ''}:`, {
          pattern: pattern.source,
          riskLevel: report.riskLevel,
          warnings: report.warnings
        });
      }

      // 高风险和严重风险都阻止使用
      if (report.riskLevel === 'critical' || report.riskLevel === 'high') {
        console.error(`${report.riskLevel === 'critical' ? 'Critical' : 'High'} regex security risk${context ? ` for ${context}` : ''}:`, {
          pattern: pattern.source,
          riskLevel: report.riskLevel,
          warnings: report.warnings,
          recommendations: report.recommendations
        });
        return false;
      }

      return true;
    } catch (error) {
      // 安全检查失败不应该影响正常使用
      console.warn('Regex security check failed:', error);
      return true;
    }
  }

  /**
   * 验证注册表中的所有正则模式
   * @private
   */
  private validateRegistryPatterns(registry: IRegistry, method: string): void {
    Object.keys(registry).forEach(type => {
      const config = registry[type];
      
      if (config instanceof RegExp) {
        // 直接的正则表达式
        if (!this.checkRegexSafety(config, `${method} method for type "${type}"`)) {
          throw new Error(`Unsafe regex pattern for type "${type}": potential ReDoS risk`);
        }
      } else if (typeof config === 'object' && config !== null) {
        // 检查是否为增强配置
        if ('pattern' in config && config.pattern instanceof RegExp) {
          if (!this.checkRegexSafety(config.pattern, `${method} method for type "${type}"`)) {
            throw new Error(`Unsafe regex pattern for type "${type}": potential ReDoS risk`);
          }
        } else {
          // 分组配置，检查每个分组
          Object.keys(config).forEach(key => {
            if (key === 'default' || key === 'description') return;
            
            const value = (config as any)[key];
            if (value instanceof RegExp) {
              if (!this.checkRegexSafety(value, `${method} method for type "${type}:${key}"`)) {
                throw new Error(`Unsafe regex pattern for type "${type}:${key}": potential ReDoS risk`);
              }
            } else if (typeof value === 'object' && value && 'pattern' in value && value.pattern instanceof RegExp) {
              if (!this.checkRegexSafety(value.pattern, `${method} method for type "${type}:${key}"`)) {
                throw new Error(`Unsafe regex pattern for type "${type}:${key}": potential ReDoS risk`);
              }
            }
          });
        }
      }
    });
  }

  /**
   * 获取正则表达式
   * @param typeSpec - 类型名称，支持 'type' 或 'type:group' 格式
   * @returns 正则表达式
   * @throws 当类型不存在时抛出错误
   */
  get(typeSpec: string): RegExp {
    if (!typeSpec || typeof typeSpec !== 'string') {
      throw new Error('Type must be a non-empty string');
    }

    const { type, group } = this.parseTypeAndGroup(typeSpec);
    const regex = this.registry.get(type, group || null);
    if (!regex) {
      throw new Error(`Unknown type "${type}"`);
    }

    return regex;
  }

  /**
   * 校验值是否匹配正则表达式
   * @param typeOrRegExp - 类型名称（支持 'type:group' 格式）或直接的正则表达式
   * @param value - 要校验的值
   * @returns 是否匹配
   */
  test(typeOrRegExp: string | RegExp, value: unknown): boolean {
    if (value == null) return false;
    
    const valueStr = String(value);
    let regex: RegExp;

    if (typeOrRegExp instanceof RegExp) {
      // 直接使用RegExp
      regex = typeOrRegExp;
    } else if (typeof typeOrRegExp === 'string') {
      // 通过类型名称获取RegExp，支持 type:group 语法
      regex = this.get(typeOrRegExp); // 让get方法抛出错误，不要捕获
    } else {
      throw new Error('First parameter must be a string (type name) or RegExp');
    }

    return regex.test(valueStr);
  }


  /**
   * 添加自定义正则表达式
   * @param type - 类型名称
   * @param pattern - 正则表达式或分组配置
   */
  add(type: string, pattern: RegexPattern): void {
    if (!type || typeof type !== 'string') {
      throw new Error('Type must be a non-empty string');
    }

    if (!pattern) {
      throw new Error('Pattern is required');
    }

    // 安全检查
    if (pattern instanceof RegExp) {
      if (!this.checkRegexSafety(pattern, `type "${type}"`)) {
        throw new Error(`Unsafe regex pattern for type "${type}": potential ReDoS risk`);
      }
    } else if (typeof pattern === 'object') {
      // 检查是否为增强配置
      if ('pattern' in pattern && pattern.pattern instanceof RegExp) {
        // 增强配置格式
        if (!this.checkRegexSafety(pattern.pattern, `type "${type}"`)) {
          throw new Error(`Unsafe regex pattern for type "${type}": potential ReDoS risk`);
        }
      } else {
        // 分组配置格式 - 检查分组中的每个正则
        const groupConfig = pattern as RegexGroupConfig;
        for (const [groupName, regex] of Object.entries(groupConfig)) {
          if (groupName !== 'default' && regex instanceof RegExp) {
            if (!this.checkRegexSafety(regex, `type "${type}" group "${groupName}"`)) {
              throw new Error(`Unsafe regex pattern for type "${type}" group "${groupName}": potential ReDoS risk`);
            }
          } else if (typeof regex === 'object' && regex && 'pattern' in regex && regex.pattern instanceof RegExp) {
            // 分组中的增强配置
            if (!this.checkRegexSafety(regex.pattern, `type "${type}" group "${groupName}"`)) {
              throw new Error(`Unsafe regex pattern for type "${type}" group "${groupName}": potential ReDoS risk`);
            }
          }
        }
      }
    }

    this.registry.add(type, pattern);
  }

  /**
   * 列出所有可用类型和分组
   * @returns 类型列表
   */
  list(): TypeInfo[] {
    return this.registry.list();
  }

  /**
   * 获取指定类型的详细信息
   * @param typeSpec - 类型名称，支持 'type' 或 'type:group' 格式（忽略分组部分）
   * @returns 类型信息，如果不存在返回null
   */
  info(typeSpec: string): TypeInfo | null {
    if (!typeSpec || typeof typeSpec !== 'string') {
      return null;
    }

    // 解析类型名，忽略分组部分（因为info是查看类型信息，不是分组信息）
    const { type } = this.parseTypeAndGroup(typeSpec);

    const typeList = this.registry.list();
    const typeInfo = typeList.find(t => t.type === type);
    return typeInfo || null;
  }

  /**
   * 配置系统行为
   * @param options - 配置选项
   */
  config(options: ConfigOptions): void {
    if (!options || typeof options !== 'object') {
      throw new Error('Options must be an object');
    }

    // 配置安全检查
    if (typeof options.securityEnabled === 'boolean') {
      this.securityEnabled = options.securityEnabled;
    }

    this.registry.setConfig(options);
  }

  /**
   * 批量注入正则表达式（合并模式）
   * @param partial - 部分注册表
   */
  inject(partial: IRegistry): void {
    if (!partial || typeof partial !== 'object') {
      throw new Error('Partial registry must be an object');
    }

    // 先进行安全检查
    this.validateRegistryPatterns(partial, 'inject');
    
    this.registry.inject(partial);
  }

  /**
   * 使用外部注册表（替换模式）
   * @param registry - 完整注册表
   */
  use(registry: IRegistry): void {
    if (!registry || typeof registry !== 'object') {
      throw new Error('Registry must be an object');
    }

    // 先进行安全检查
    this.validateRegistryPatterns(registry, 'use');
    
    this.registry.use(registry);
  }

  /**
   * 加载内置正则表达式库
   * @param builtinRegexes - 内置正则表达式数据
   */
  loadBuiltins(builtinRegexes: IRegistry): void {
    this.registry.loadData(builtinRegexes);
  }

  // ============= 文本操作方法 =============

  /**
   * 获取用于搜索的正则表达式（移除锚点）
   */
  private getSearchRegex(typeOrRegex: string | RegExp): RegExp {
    const baseRegex = typeof typeOrRegex === 'string' ? this.get(typeOrRegex) : typeOrRegex;
    let source = baseRegex.source;
    if (source.startsWith('^')) source = source.substring(1);
    if (source.endsWith('$')) source = source.substring(0, source.length - 1);
    return new RegExp(source, baseRegex.flags);
  }

  /**
   * 获取用于全局搜索的正则表达式
   */
  private getGlobalSearchRegex(typeOrRegex: string | RegExp): RegExp {
    const searchRegex = this.getSearchRegex(typeOrRegex);
    const flags = searchRegex.flags.includes('g') ? searchRegex.flags : searchRegex.flags + 'g';
    return new RegExp(searchRegex.source, flags);
  }

  /**
   * 从文本中提取第一个匹配项
   * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或直接的正则表达式
   * @param text - 要搜索的文本
   * @param processor - 处理函数（可选）
   * @returns 匹配的字符串或null
   */
  extract(typeOrRegex: string | RegExp, text: string, processor?: string | ((match: string, ...args: any[]) => string)): string | null {
    if (!text) return null;
    
    try {
      const regex = this.getSearchRegex(typeOrRegex);
      const match = text.match(regex);
      if (!match) return null;
      
      // 如果提供了处理函数，应用它
      if (typeof processor === 'function') {
        return processor(match[0], match.index || 0, text);
      }
      
      return match[0];
    } catch (error) {
      console.warn('Extract operation failed:', error);
      return null;
    }
  }

  /**
   * 从文本中提取所有匹配项
   */
  extractAll(typeOrRegex: string | RegExp, text: string, processor?: string | ((match: string, ...args: any[]) => string)): string[] {
    if (!text) return [];
    
    try {
      const regex = this.getGlobalSearchRegex(typeOrRegex);
      const matches = text.match(regex);
      if (!matches) return [];
      
      // 如果提供了处理函数，应用到每个匹配项
      if (typeof processor === 'function') {
        return matches.map((match, index) => processor(match, index, text));
      }
      
      return matches;
    } catch (error) {
      console.warn('ExtractAll operation failed:', error);
      return [];
    }
  }

  /**
   * 替换文本中的第一个匹配项
   */
  replace(typeOrRegex: string | RegExp, text: string, replacement: string | ((match: string, ...args: any[]) => string)): string {
    if (!text) return text;
    
    try {
      const regex = this.getSearchRegex(typeOrRegex);
      return text.replace(regex, replacement as any);
    } catch (error) {
      console.warn('Replace operation failed:', error);
      return text;
    }
  }

  /**
   * 替换文本中的所有匹配项
   */
  replaceAll(typeOrRegex: string | RegExp, text: string, replacement: string | ((match: string, ...args: any[]) => string)): string {
    if (!text) return text;
    
    try {
      const regex = this.getGlobalSearchRegex(typeOrRegex);
      return text.replace(regex, replacement as any);
    } catch (error) {
      console.warn('ReplaceAll operation failed:', error);
      return text;
    }
  }

  /**
   * 统计匹配项数量
   */
  count(typeOrRegex: string | RegExp, text: string): number {
    if (!text) return 0;
    
    try {
      const matches = this.extractAll(typeOrRegex, text);
      return matches.length;
    } catch (error) {
      console.warn('Count operation failed:', error);
      return 0;
    }
  }

  /**
   * 查找第一个匹配项的详细信息
   */
  find(typeOrRegex: string | RegExp, text: string): { 
    match: string; 
    index: number; 
    length: number; 
  } | null {
    if (!text) return null;
    
    try {
      const regex = this.getSearchRegex(typeOrRegex);
      const match = regex.exec(text);
      
      if (match) {
        return {
          match: match[0],
          index: match.index || 0,
          length: match[0].length
        };
      }
      
      return null;
    } catch (error) {
      console.warn('Find operation failed:', error);
      return null;
    }
  }

  /**
   * 查找所有匹配项的详细信息
   */
  findAll(typeOrRegex: string | RegExp, text: string): Array<{ 
    match: string; 
    index: number; 
    length: number; 
  }> {
    if (!text) return [];
    
    try {
      const regex = this.getGlobalSearchRegex(typeOrRegex);
      const matches = [];
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          match: match[0],
          index: match.index || 0,
          length: match[0].length
        });
        
        // 防止无限循环
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
      
      return matches;
    } catch (error) {
      console.warn('FindAll operation failed:', error);
      return [];
    }
  }

  /**
   * 移除第一个匹配项
   */
  remove(typeOrRegex: string | RegExp, text: string): string {
    return this.replace(typeOrRegex, text, '');
  }

  /**
   * 移除所有匹配项
   */
  removeAll(typeOrRegex: string | RegExp, text: string): string {
    return this.replaceAll(typeOrRegex, text, '');
  }

  /**
   * 高亮匹配项 (HTML)
   */
  highlight(typeOrRegex: string | RegExp, text: string, wrapper: string | ((match: string, ...args: any[]) => string) = '<mark>$&</mark>'): string {
    return this.replaceAll(typeOrRegex, text, wrapper);
  }

  /**
   * 创建链式调用实例
   */
  chain(text: string, options?: ChainOptions): RegexChain {
    return createChain(text, this, options);
  }


}

export default RegexKit;
