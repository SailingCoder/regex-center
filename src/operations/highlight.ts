/**
 * 高亮显示功能
 */

import { rx } from '../index';

export interface HighlightOptions {
  wrapper?: string;
  className?: string;
  style?: string;
}

/**
 * 在文本中高亮匹配项 (HTML)
 */
export function highlight(
  typeOrRegex: string | RegExp, 
  text: string, 
  options: HighlightOptions = {}
): string {
  if (!text) return text;
  
  const { wrapper = '<mark>$&</mark>', className, style } = options;
  
  let finalWrapper = wrapper;
  
  if (className) {
    finalWrapper = `<span class="${className}">$&</span>`;
  }
  
  if (style) {
    finalWrapper = `<span style="${style}">$&</span>`;
  }
  
  return rx.replaceAll(typeOrRegex, text, finalWrapper);
}

/**
 * 控制台彩色高亮
 */
export function highlightConsole(
  typeOrRegex: string | RegExp, 
  text: string, 
  color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' = 'yellow'
): string {
  if (!text) return text;
  
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
  };
  
  const reset = '\x1b[0m';
  const colorCode = colors[color] || colors.yellow;
  
  return rx.replaceAll(typeOrRegex, text, `${colorCode}$&${reset}`);
}
