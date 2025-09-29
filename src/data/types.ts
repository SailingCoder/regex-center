/**
 * 正则表达式配置的类型定义
 */

export interface RegexExamples {
  valid: string[];
  invalid: string[];
}

export interface RegexGroupConfig {
  pattern: RegExp;
  description?: string;
  examples?: RegexExamples;
}

export interface RegexTypeConfig {
  default?: string;
  pattern?: RegExp;
  groups?: Record<string, RegexGroupConfig>;
  examples?: RegexExamples;
}

export interface RegexCollection {
  [key: string]: RegexTypeConfig;
}
