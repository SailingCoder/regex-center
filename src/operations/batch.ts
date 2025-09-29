/**
 * 批量操作功能
 * 
 * 包含原始同步版本和优化异步版本
 * - 同步版本：向后兼容，适用于小数据量
 * - 异步版本：高性能优化，适用于大数据量和复杂场景
 */

import { rx } from '../index';

export interface BatchExtractResult {
  [type: string]: string[];
}

export interface BatchCountResult {
  [type: string]: number;
}

// 注意：已移除复杂的异步优化版本，保持简洁高效

/**
 * 批量提取多种类型的匹配项
 */
export function extractBatch(
  text: string, 
  types: string[] | Record<string, string>
): BatchExtractResult {
  if (!text) return {};
  
  const result: BatchExtractResult = {};
  
  try {
    if (Array.isArray(types)) {
      // 数组形式：['email', 'phone']
      for (const type of types) {
        result[type] = rx.extractAll(type, text);
      }
    } else {
      // 对象形式：{ phone: 'CN', email: 'basic' }
      for (const [type, group] of Object.entries(types)) {
        result[type] = rx.extractAll(`${type}:${group}`, text);
      }
    }
  } catch (error) {
    console.warn('ExtractBatch operation failed:', error);
  }
  
  return result;
}

/**
 * 批量替换多种类型的匹配项
 */
export function replaceBatch(
  text: string, 
  replacements: Record<string, string>
): string {
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
}

/**
 * 批量统计多种类型的匹配项
 */
export function countBatch(
  text: string, 
  types: string[] | Record<string, string>
): BatchCountResult {
  if (!text) return {};
  
  const result: BatchCountResult = {};
  
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
}