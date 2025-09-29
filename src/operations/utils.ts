/**
 * 工具功能模块
 */

import { rx } from '../index';

/**
 * 按正则类型分割文本
 */
export function split(typeOrRegex: string | RegExp, text: string): string[] {
  if (!text) return [];
  
  try {
    const regex = typeof typeOrRegex === 'string' ? 
      rx.get(typeOrRegex) :
      typeOrRegex;
    
    return text.split(regex).filter(part => part.trim() !== '');
  } catch (error) {
    console.warn('Split operation failed:', error);
    return [text];
  }
}

/**
 * 按多种类型分割文本
 */
export function splitBy(text: string, types: string[]): string[] {
  if (!text || !types.length) return [text];
  
  let result = [text];
  
  for (const type of types) {
    const newResult: string[] = [];
    for (const part of result) {
      newResult.push(...split(type, part));
    }
    result = newResult;
  }
  
  return result.filter(part => part.trim() !== '');
}

/**
 * 移除匹配项
 */
export function remove(typeOrRegex: string | RegExp, text: string): string {
  return rx.replaceAll(typeOrRegex, text, '');
}

/**
 * 只保留指定类型的匹配项
 */
export function keep(text: string, types: string[]): string {
  if (!text || !types.length) return '';
  
  const results: string[] = [];
  
  for (const type of types) {
    results.push(...rx.extractAll(type, text));
  }
  
  return results.join(' ');
}

/**
 * 清理文本
 */
export function clean(text: string, rules: string[]): string {
  if (!text) return text;
  
  let result = text;
  
  for (const rule of rules) {
    switch (rule) {
      case 'whitespace':
        result = result.replace(/\s+/g, ' ').trim();
        break;
      case 'linebreaks':
        result = result.replace(/\r?\n/g, '\n').replace(/\n+/g, '\n');
        break;
      case 'tabs':
        result = result.replace(/\t+/g, ' ');
        break;
      case 'extraSpaces':
        result = result.replace(/  +/g, ' ');
        break;
    }
  }
  
  return result;
}
