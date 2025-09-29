/**
 * Regex Kit - 类型定义
 * 为整个库提供完整的 TypeScript 类型支持
 */

// ============= 基础类型定义 =============

/**
 * 正则表达式配置对象
 * 支持单个正则、多分组配置或增强配置
 */
export type RegexPattern = RegExp | RegexGroupConfig | EnhancedRegexConfig;

/**
 * 验证示例
 */
export interface RegexExamples {
  /** 有效示例（应该匹配的） */
  valid: string[];
  /** 无效示例（不应该匹配的） */
  invalid: string[];
}

/**
 * 增强的正则配置（推荐格式）
 */
export interface EnhancedRegexConfig {
  /** 正则表达式 */
  pattern: RegExp;
  /** 描述说明 */
  description: string;
  /** 验证示例 */
  examples: RegexExamples;
}

/**
 * 增强的分组正则配置
 */
export interface EnhancedGroupConfig {
  /** 默认分组名称（可选） */
  default?: string;
  /** 描述说明 */
  description?: string;
  /** 分组配置 */
  [groupName: string]: RegExp | EnhancedRegexConfig | string | undefined;
}

/**
 * 多分组正则配置（兼容旧格式）
 */
export interface RegexGroupConfig {
  /** 默认分组名称（可选） */
  default?: string;
  /** 分组名称到正则表达式的映射 */
  [groupName: string]: RegExp | EnhancedRegexConfig | string | undefined;
}

/**
 * 注册表结构
 * 存储所有正则表达式类型和分组
 */
export interface Registry {
  [typeName: string]: RegexPattern;
}

/**
 * 类型信息
 * 用于列表展示和查询
 */
export interface TypeInfo {
  /** 类型名称 */
  type: string;
  /** 可用分组列表 */
  groups: string[];
  /** 默认分组（如果有） */
  default?: string;
  /** 描述说明 */
  description?: string;
  /** 验证示例 */
  examples?: RegexExamples;
}

// ============= 配置类型 =============

/**
 * 分组回退策略
 */
export type GroupFallbackStrategy = 'strict' | 'first';

/**
 * 系统配置选项
 */
export interface ConfigOptions {
  /** 分组回退策略 */
  groupFallback?: GroupFallbackStrategy;
  /** 是否启用安全检查（ReDoS防护） */
  securityEnabled?: boolean;
}

// ============= API 接口类型 =============

/**
 * 核心 API 接口
 * 定义所有公开方法的签名
 */
export interface IRegexKit {
  /**
   * 获取正则表达式
   * @param typeSpec 类型名称，支持 'type' 或 'type:group' 格式
   * @returns 正则表达式
   * @throws 当类型不存在时抛出错误
   */
  get(typeSpec: string): RegExp;

  /**
   * 校验值是否匹配正则表达式
   * @param typeOrRegExp 类型名称（支持 'type:group' 格式）或直接的正则表达式
   * @param value 要校验的值
   * @returns 是否匹配
   */
  test(typeOrRegExp: string | RegExp, value: unknown): boolean;

  /**
   * 添加自定义正则表达式
   * @param type 类型名称
   * @param pattern 正则表达式或分组配置
   */
  add(type: string, pattern: RegexPattern): void;

  /**
   * 列出所有可用类型和分组
   * @returns 类型列表
   */
  list(): TypeInfo[];

  /**
   * 获取指定类型的详细信息
   * @param typeSpec 类型名称，支持 'type' 或 'type:group' 格式
   * @returns 类型信息，如果不存在返回null
   */
  info(typeSpec: string): TypeInfo | null;

  /**
   * 配置系统行为
   * @param options 配置选项
   */
  config(options: ConfigOptions): void;

  /**
   * 批量注入正则表达式（合并模式）
   * @param partial 部分注册表
   */
  inject(partial: Registry): void;

  /**
   * 使用外部注册表（替换模式）
   * @param registry 完整注册表
   */
  use(registry: Registry): void;

  /**
   * 加载内置正则表达式库
   * @param builtinRegexes 内置正则表达式数据
   */
  loadBuiltins(builtinRegexes: Registry): void;

  // ============= 文本操作方法 =============

  /**
   * 从文本中提取第一个匹配项
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @param processor 处理函数（可选）
   * @returns 匹配的文本或null
   */
  extract(typeOrRegex: string | RegExp, text: string, processor?: string | ((match: string, ...args: any[]) => string)): string | null;

  /**
   * 从文本中提取所有匹配项
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @param processor 处理函数（可选）
   * @returns 匹配的文本数组
   */
  extractAll(typeOrRegex: string | RegExp, text: string, processor?: string | ((match: string, ...args: any[]) => string)): string[];

  /**
   * 替换文本中的第一个匹配项
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @param replacement 替换文本或函数
   * @returns 替换后的文本
   */
  replace(typeOrRegex: string | RegExp, text: string, replacement: string | ((match: string, ...args: any[]) => string)): string;

  /**
   * 替换文本中的所有匹配项
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @param replacement 替换文本或函数
   * @returns 替换后的文本
   */
  replaceAll(typeOrRegex: string | RegExp, text: string, replacement: string | ((match: string, ...args: any[]) => string)): string;

  /**
   * 统计匹配项数量
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @returns 匹配数量
   */
  count(typeOrRegex: string | RegExp, text: string): number;

  /**
   * 查找第一个匹配项的详细信息
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @returns 匹配详情或null
   */
  find(typeOrRegex: string | RegExp, text: string): { 
    match: string; 
    index: number; 
    length: number; 
  } | null;

  /**
   * 查找所有匹配项的详细信息
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @returns 所有匹配项的详情数组
   */
  findAll(typeOrRegex: string | RegExp, text: string): Array<{ 
    match: string; 
    index: number; 
    length: number; 
  }>;

  /**
   * 移除第一个匹配项
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @returns 移除第一个匹配项后的文本
   */
  remove(typeOrRegex: string | RegExp, text: string): string;

  /**
   * 移除所有匹配项
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @returns 移除所有匹配项后的文本
   */
  removeAll(typeOrRegex: string | RegExp, text: string): string;

  /**
   * 高亮匹配项 (HTML)
   * @param typeOrRegex 类型名称（支持 'type:group' 格式）或正则表达式
   * @param text 源文本
   * @param wrapper HTML包装器或处理函数，默认为'<mark>$&</mark>'
   * @returns 高亮后的HTML文本
   */
  highlight(typeOrRegex: string | RegExp, text: string, wrapper?: string | ((match: string, ...args: any[]) => string)): string;
  
  // 链式调用功能
  chain(text: string, options?: ChainOptions): RegexChain;
}

// ============= 链式调用类型 =============

/**
 * 链式调用配置
 */
export interface ChainOptions {
  enableLogging?: boolean;    // 是否启用操作日志
  throwOnError?: boolean;     // 遇到错误时是否抛出异常
  maxOperations?: number;     // 最大操作数限制
}

/**
 * 链式操作结果
 */
export interface ChainResult {
  readonly text: string;
  readonly operations: string[];
  readonly metadata: {
    originalLength: number;
    currentLength: number;
    operationCount: number;
    lastOperation: string;
  };
}

/**
 * 链式调用构建器
 */
export interface RegexChain extends ChainResult {
  // 文本处理方法
  test(typeOrRegex: string | RegExp): boolean;
  extract(typeOrRegex: string | RegExp, processor?: string | ((match: string, ...args: any[]) => string)): RegexChain;
  extractAll(typeOrRegex: string | RegExp, separator?: string, processor?: string | ((match: string, ...args: any[]) => string)): RegexChain;
  replace(typeOrRegex: string | RegExp, replacement: string | ((match: string, ...args: any[]) => string)): RegexChain;
  replaceAll(typeOrRegex: string | RegExp, replacement: string | ((match: string, ...args: any[]) => string)): RegexChain;
  remove(typeOrRegex: string | RegExp): RegexChain;
  removeAll(typeOrRegex: string | RegExp): RegexChain;
  highlight(typeOrRegex: string | RegExp, wrapper?: string | ((match: string, ...args: any[]) => string)): RegexChain;
  count(typeOrRegex: string | RegExp): number;
  find(typeOrRegex: string | RegExp): { match: string; index: number; length: number; } | null;
  findAll(typeOrRegex: string | RegExp): Array<{ match: string; index: number; length: number; }>;
  
  // 工具方法
  transform(transformer: (text: string) => string, operationName?: string): RegexChain;
  when(condition: boolean | ((text: string) => boolean), operation: (chain: RegexChain) => RegexChain): RegexChain;
  branch(condition: boolean | ((text: string) => boolean), trueOperation: (chain: RegexChain) => RegexChain, falseOperation?: (chain: RegexChain) => RegexChain): RegexChain;
  debug(label?: string): RegexChain;
  clone(): RegexChain;
  reset(): RegexChain;
  result(): ChainResult;
  toString(): string;
  toJSON(): ChainResult;
  summary(): string;
}

// ============= 工具类型 =============

/**
 * 深度只读类型
 * 确保配置对象不被意外修改
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 可选的深度只读类型
 */
export type PartialDeepReadonly<T> = {
  readonly [P in keyof T]?: T[P] extends object ? PartialDeepReadonly<T[P]> : T[P];
};

// ============= 内置类型常量 =============

/**
 * 常用内置类型名称
 * 提供类型安全的类型名称常量
 */
export const BuiltinTypes = {
  // 通信类
  EMAIL: 'email',
  PHONE: 'phone',
  FAX: 'fax',
  
  // 网络类
  URL: 'url',
  DOMAIN: 'domain',
  IP: 'ip',
  MAC: 'mac',
  PORT: 'port',
  
  // 身份类
  ID_CARD: 'idCard',
  PASSPORT: 'passport',
  USERNAME: 'username',
  
  // 金融类
  BANK_CARD: 'bankCard',
  CREDIT_CARD: 'creditCard',
  IBAN: 'iban',
  
  // 时间类
  DATE: 'date',
  TIME: 'time',
  TIMESTAMP: 'timestamp',
  
  // 安全类
  PASSWORD: 'password',
  API_KEY: 'apiKey',
  TOKEN: 'token',
  HASH: 'hash',
  UUID: 'uuid',
  
  // 格式类
  NUMBER: 'number',
  HEX_COLOR: 'hexColor',
  
  // 其他
  VERSION: 'version',
  SLUG: 'slug'
} as const;

/**
 * 内置类型名称的联合类型
 */
export type BuiltinTypeName = typeof BuiltinTypes[keyof typeof BuiltinTypes];

/**
 * 常用分组名称
 */
export const CommonGroups = {
  // 地区
  CN: 'CN',
  US: 'US',
  UK: 'UK',
  HK: 'HK',
  TW: 'TW',
  JP: 'JP',
  
  // 强度级别
  BASIC: 'basic',
  MEDIUM: 'medium',
  STRONG: 'strong',
  STRICT: 'strict',
  
  // 版本
  V1: 'v1',
  V4: 'v4',
  V6: 'v6',
  
  // 格式
  STANDARD: 'standard',
  COMPACT: 'compact',
  ENTERPRISE: 'enterprise'
} as const;

/**
 * 常用分组名称的联合类型
 */
export type CommonGroupName = typeof CommonGroups[keyof typeof CommonGroups];