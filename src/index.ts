/**
 * Regex Kit - 主入口文件
 */

import RegexKit from './core/api';
import { loadBuiltinRegexes } from './utils/dataLoader';
import { 
  IRegexKit,
  Registry,
  RegexPattern,
  TypeInfo,
  ConfigOptions,
  BuiltinTypes,
  CommonGroups
} from './types/index';

// 可选的高级功能导出（按需使用）
// 框架适配器
export {
  createVueAdapter,
  createReactAdapter,
  createAngularAdapter
} from './adapters/index';

// 性能监控工具
export {
  performanceMonitor
} from './utils/performance';

// 安全检查工具
export {
  RegexSecurityChecker,
  createSafeRegex
} from './utils/security';

// 创建全局实例
const rx = new RegexKit();

// 加载内置正则表达式
try {
  const builtins = loadBuiltinRegexes();
  rx.loadBuiltins(builtins);
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.warn('Failed to load built-in regexes:', errorMessage);
}

// 导出类型（用于TypeScript用户）
export type {
  IRegexKit,
  Registry,
  RegexPattern,
  TypeInfo,
  ConfigOptions
};

// 导出常量
export {
  BuiltinTypes,
  CommonGroups
};

// 导出主实例和类
export { rx, RegexKit };

// 导出工具函数
export { loadBuiltinRegexes };

// ============= 函数式API导出 =============
// 用户可以选择两种方式：
// 1. 实例方式：import { rx } from 'regex-pro'; rx.test(...)
// 2. 函数方式：import { test, extract } from 'regex-pro'; test(...)

/**
 * 验证文本是否匹配正则类型
 * @param value - 要验证的值
 * @param typeOrRegExp - 类型名称（支持type:group语法）或直接的正则表达式
 * @returns 是否匹配
 */
export const test = (typeOrRegExp: string | RegExp, value: unknown): boolean => {
  return rx.test(typeOrRegExp, value);
};

/**
 * 获取正则表达式
 * @param typeSpec - 类型名称（支持type:group语法）
 * @returns 正则表达式
 */
export const get = (typeSpec: string): RegExp => {
  return rx.get(typeSpec);
};

/**
 * 添加自定义正则表达式
 * @param type - 类型名称
 * @param pattern - 正则表达式或分组配置
 */
export const add = (type: string, pattern: RegexPattern): void => {
  return rx.add(type, pattern);
};

/**
 * 列出所有可用类型和分组
 * @returns 类型列表
 */
export const list = (): TypeInfo[] => {
  return rx.list();
};

/**
 * 获取指定类型的详细信息
 * @param type - 类型名称
 * @returns 类型信息，如果不存在返回null
 */
export const info = (typeSpec: string): TypeInfo | null => {
  return rx.info(typeSpec);
};

/**
 * 从文本中提取第一个匹配项
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @param processor - 处理函数（可选）
 * @returns 匹配的文本或null
 */
export const extract = (typeOrRegex: string | RegExp, text: string, processor?: string | ((match: string, ...args: any[]) => string)): string | null => {
  return rx.extract(typeOrRegex, text, processor);
};

/**
 * 从文本中提取所有匹配项
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @param processor - 处理函数（可选）
 * @returns 匹配的文本数组
 */
export const extractAll = (typeOrRegex: string | RegExp, text: string, processor?: string | ((match: string, ...args: any[]) => string)): string[] => {
  return rx.extractAll(typeOrRegex, text, processor);
};

/**
 * 替换文本中的第一个匹配项
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @param replacement - 替换文本或函数
 * @returns 替换后的文本
 */
export const replace = (typeOrRegex: string | RegExp, text: string, replacement: string | ((match: string, ...args: any[]) => string)): string => {
  return rx.replace(typeOrRegex, text, replacement);
};

/**
 * 替换文本中的所有匹配项
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @param replacement - 替换文本或函数
 * @returns 替换后的文本
 */
export const replaceAll = (typeOrRegex: string | RegExp, text: string, replacement: string | ((match: string, ...args: any[]) => string)): string => {
  return rx.replaceAll(typeOrRegex, text, replacement);
};

/**
 * 统计匹配项数量
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @returns 匹配数量
 */
export const count = (typeOrRegex: string | RegExp, text: string): number => {
  return rx.count(typeOrRegex, text);
};

/**
 * 查找第一个匹配项的详细信息
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @returns 匹配详情或null
 */
export const find = (typeOrRegex: string | RegExp, text: string): { 
  match: string; 
  index: number; 
  length: number; 
} | null => {
  return rx.find(typeOrRegex, text);
};

/**
 * 查找所有匹配项的详细信息
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @returns 所有匹配项的详情数组
 */
export const findAll = (typeOrRegex: string | RegExp, text: string): Array<{ 
  match: string; 
  index: number; 
  length: number; 
}> => {
  return rx.findAll(typeOrRegex, text);
};

/**
 * 移除第一个匹配项
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @returns 移除第一个匹配项后的文本
 */
export const remove = (typeOrRegex: string | RegExp, text: string): string => {
  return rx.remove(typeOrRegex, text);
};

/**
 * 移除所有匹配项
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @returns 移除所有匹配项后的文本
 */
export const removeAll = (typeOrRegex: string | RegExp, text: string): string => {
  return rx.removeAll(typeOrRegex, text);
};

/**
 * 高亮匹配项 (HTML)
 * @param text - 源文本
 * @param typeOrRegex - 类型名称（支持 'type:group' 格式）或正则表达式
 * @param wrapper - HTML包装器或处理函数，默认为'<mark>$&</mark>'
 * @returns 高亮后的HTML文本
 */
export const highlight = (typeOrRegex: string | RegExp, text: string, wrapper: string | ((match: string, ...args: any[]) => string) = '<mark>$&</mark>'): string => {
  return rx.highlight(typeOrRegex, text, wrapper);
};

// ============= 高级功能导出 =============
// 批量操作和高级功能，按需导入不会增加主包体积

/**
 * 批量提取多种类型的匹配项
 * @param text - 源文本
 * @param types - 类型数组或类型-分组映射对象
 * @returns 批量提取结果
 */
export const extractBatch = (
  text: string, 
  types: string[] | Record<string, string>
): Record<string, string[]> => {
  if (!text) return {};
  
  const result: Record<string, string[]> = {};
  
  try {
    if (Array.isArray(types)) {
      for (const type of types) {
        result[type] = rx.extractAll(type, text);
      }
    } else {
      for (const [type, group] of Object.entries(types)) {
        result[type] = rx.extractAll(`${type}:${group}`, text);
      }
    }
  } catch (error) {
    console.warn('ExtractBatch operation failed:', error);
  }
  
  return result;
};

/**
 * 批量替换多种类型的匹配项
 * @param text - 源文本
 * @param replacements - 类型-替换文本映射
 * @returns 替换后的文本
 */
export const replaceBatch = (
  text: string, 
  replacements: Record<string, string>
): string => {
  if (!text) return text;
  
  let result = text;
  
  try {
    for (const [type, replacement] of Object.entries(replacements)) {
      result = rx.replaceAll(type, result, replacement);
    }
  } catch (error) {
    console.warn('ReplaceBatch operation failed:', error);
    return text;
  }
  
  return result;
};

/**
 * 批量统计多种类型的匹配项
 * @param text - 源文本
 * @param types - 类型数组或类型-分组映射对象
 * @returns 批量统计结果
 */
export const countBatch = (
  text: string, 
  types: string[] | Record<string, string>
): Record<string, number> => {
  if (!text) return {};
  
  const result: Record<string, number> = {};
  
  try {
    if (Array.isArray(types)) {
      for (const type of types) {
        result[type] = rx.count(type, text);
      }
    } else {
      for (const [type, group] of Object.entries(types)) {
        result[type] = rx.count(`${type}:${group}`, text);
      }
    }
  } catch (error) {
    console.warn('CountBatch operation failed:', error);
  }
  
  return result;
};

// 版本信息
export const version = '1.0.0';

// 默认导出（兼容性）
const regexKit = {
  rx,
  RegexKit,
  loadBuiltinRegexes,
  BuiltinTypes,
  CommonGroups,
  version
};

export default regexKit;
