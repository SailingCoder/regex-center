/**
 * 数据加载器
 * 负责加载和转换现有的正则表达式数据
 */

import { Registry } from '../types/index';

// 原始数据格式接口
interface RawGroupConfig {
  pattern: RegExp;
  examples?: {
    valid: string[];
    invalid: string[];
  };
}

interface RawTypeConfig {
  default?: string;
  groups: Record<string, RawGroupConfig>;
}

interface RawData {
  [type: string]: RegExp | RawTypeConfig;
}

/**
 * 转换现有数据格式为注册表格式
 * @param rawData - 原始数据
 * @returns 转换后的注册表数据
 */
function transformData(rawData: RawData): Registry {
  const result: Registry = {};
  
  Object.keys(rawData).forEach(type => {
    const config = rawData[type];
    
    if (!config) return;
    
    // 直接RegExp的情况
    if (config instanceof RegExp) {
      result[type] = config;
      return;
    }
    
    // 分组配置的情况
    if ('groups' in config && config.groups) {
      const groups: Record<string, RegExp> = {};
      
      Object.keys(config.groups).forEach(group => {
        const groupConfig = config.groups[group];
        
        if (groupConfig && groupConfig.pattern) {
          // 提取pattern，忽略examples（examples可以用于测试）
          groups[group] = groupConfig.pattern;
        }
      });
      
      // 构建分组配置，包含default属性
      const groupConfig: Record<string, RegExp | string | undefined> = {
        ...groups
      };
      
      if (config.default) {
        groupConfig.default = config.default;
      }
      
      result[type] = groupConfig;
    }
  });
  
  return result;
}

/**
 * 加载所有内置正则表达式
 * @returns 内置正则表达式数据
 */
// 直接导入数据，确保Rollup能够打包
import builtinData from '../data/index';

function loadBuiltinRegexes(): Registry {
  try {
    // 直接使用导入的数据
    return transformData(builtinData as RawData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to load builtin regexes:', errorMessage);
    return {};
  }
}


export {
  loadBuiltinRegexes,
  transformData
};
