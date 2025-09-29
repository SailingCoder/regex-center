/**
 * 链式调用API
 * 
 * 提供流畅的链式调用体验，支持文本处理的连续操作
 * 
 * 特性：
 * - 流畅的链式调用语法
 * - 完善的错误处理机制
 * - 操作历史记录和调试支持
 * - 灵活的配置选项
 * - 类型安全的TypeScript支持
 */

import RegexCenter from './api';

// 链式操作结果接口
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

// 链式调用配置
export interface ChainOptions {
  enableLogging?: boolean;    // 是否启用操作日志
  throwOnError?: boolean;     // 遇到错误时是否抛出异常
  maxOperations?: number;     // 最大操作数限制
}

/**
 * 链式调用构建器
 * 
 * 支持流畅的文本处理操作链
 */
export class RegexChain implements ChainResult {
  private _text: string;
  private _operations: string[] = [];
  private _originalLength: number;
  private _options: Required<ChainOptions>;
  private _rx: RegexCenter;

  constructor(text: string, rx: RegexCenter, options: ChainOptions = {}) {
    this._text = text || '';
    this._originalLength = this._text.length;
    this._rx = rx;
    this._options = {
      enableLogging: false,
      throwOnError: true,
      maxOperations: 50,
      ...options
    };
    
    if (this._options.enableLogging) {
      console.log(`[RegexChain] 初始化，文本长度: ${this._originalLength}`);
    }
  }

  // 只读属性
  get text(): string {
    return this._text;
  }

  get operations(): string[] {
    return [...this._operations];
  }

  get metadata() {
    return {
      originalLength: this._originalLength,
      currentLength: this._text.length,
      operationCount: this._operations.length,
      lastOperation: this._operations[this._operations.length - 1] || 'none'
    };
  }

  /**
   * 私有方法：执行操作并记录
   */
  private executeOperation<T>(
    operationName: string,
    operation: () => T,
    updateText: boolean = true
  ): T | RegexChain {
    try {
      // 检查操作数限制
      if (this._operations.length >= this._options.maxOperations) {
        throw new Error(`操作数超过限制 (${this._options.maxOperations})`);
      }

      const result = operation();
      this._operations.push(operationName);

      if (this._options.enableLogging) {
        console.log(`[RegexChain] ${operationName} - 文本长度: ${this._text.length}`);
      }

      if (updateText && typeof result === 'string') {
        this._text = result;
        return this;
      }

      return result;
    } catch (error) {
      const errorMsg = `链式操作失败 [${operationName}]: ${error instanceof Error ? error.message : String(error)}`;
      
      if (this._options.throwOnError) {
        throw new Error(errorMsg);
      } else {
        console.warn(errorMsg);
        return updateText ? this : (null as any);
      }
    }
  }

  /**
   * 测试匹配
   */
  test(typeOrRegex: string | RegExp): boolean {
    return this.executeOperation(
      `test(${typeOrRegex})`,
      () => this._rx.test(typeOrRegex, this._text),
      false
    ) as boolean;
  }

  /**
   * 提取第一个匹配项
   */
  extract(typeOrRegex: string | RegExp, processor?: string | ((match: string, ...args: any[]) => string)): RegexChain {
    return this.executeOperation(
      `extract(${typeOrRegex})`,
      () => {
        const result = this._rx.extract(typeOrRegex, this._text, processor);
        return result || this._text; // 如果没有匹配，保持原文本
      }
    ) as RegexChain;
  }

  /**
   * 提取所有匹配项并连接
   */
  extractAll(typeOrRegex: string | RegExp, separator: string = '', processor?: string | ((match: string, ...args: any[]) => string)): RegexChain {
    return this.executeOperation(
      `extractAll(${typeOrRegex})`,
      () => {
        const results = this._rx.extractAll(typeOrRegex, this._text, processor);
        if (results.length > 0) {
          // 将提取结果添加到当前文本末尾
          const newContent = results.map(result => separator + result).join('');
          return this._text + newContent;
        }
        return this._text;
      }
    ) as RegexChain;
  }

  /**
   * 替换第一个匹配项
   */
  replace(typeOrRegex: string | RegExp, replacement: string | ((match: string, ...args: any[]) => string)): RegexChain {
    return this.executeOperation(
      `replace(${typeOrRegex})`,
      () => this._rx.replace(typeOrRegex, this._text, replacement)
    ) as RegexChain;
  }

  /**
   * 替换所有匹配项
   */
  replaceAll(typeOrRegex: string | RegExp, replacement: string | ((match: string, ...args: any[]) => string)): RegexChain {
    return this.executeOperation(
      `replaceAll(${typeOrRegex})`,
      () => this._rx.replaceAll(typeOrRegex, this._text, replacement)
    ) as RegexChain;
  }

  /**
   * 移除第一个匹配项
   */
  remove(typeOrRegex: string | RegExp): RegexChain {
    return this.executeOperation(
      `remove(${typeOrRegex})`,
      () => this._rx.remove(typeOrRegex, this._text)
    ) as RegexChain;
  }

  /**
   * 移除所有匹配项
   */
  removeAll(typeOrRegex: string | RegExp): RegexChain {
    return this.executeOperation(
      `removeAll(${typeOrRegex})`,
      () => this._rx.removeAll(typeOrRegex, this._text)
    ) as RegexChain;
  }

  /**
   * 高亮匹配项
   */
  highlight(typeOrRegex: string | RegExp, wrapper: string | ((match: string, ...args: any[]) => string) = '<mark>$&</mark>'): RegexChain {
    return this.executeOperation(
      `highlight(${typeOrRegex})`,
      () => this._rx.highlight(typeOrRegex, this._text, wrapper)
    ) as RegexChain;
  }

  /**
   * 统计匹配数量
   */
  count(typeOrRegex: string | RegExp): number {
    return this.executeOperation(
      `count(${typeOrRegex})`,
      () => this._rx.count(typeOrRegex, this._text),
      false
    ) as number;
  }

  /**
   * 查找匹配位置
   */
  find(typeOrRegex: string | RegExp): { match: string; index: number; length: number; } | null {
    return this.executeOperation(
      `find(${typeOrRegex})`,
      () => this._rx.find(typeOrRegex, this._text),
      false
    ) as { match: string; index: number; length: number; } | null;
  }

  /**
   * 查找所有匹配位置
   */
  findAll(typeOrRegex: string | RegExp): Array<{ match: string; index: number; length: number; }> {
    return this.executeOperation(
      `findAll(${typeOrRegex})`,
      () => this._rx.findAll(typeOrRegex, this._text),
      false
    ) as Array<{ match: string; index: number; length: number; }>;
  }

  /**
   * 自定义文本处理
   */
  transform(transformer: (text: string) => string, operationName?: string): RegexChain {
    return this.executeOperation(
      operationName || 'transform',
      () => transformer(this._text)
    ) as RegexChain;
  }

  /**
   * 条件执行
   */
  when(condition: boolean | ((text: string) => boolean), operation: (chain: RegexChain) => RegexChain): RegexChain {
    const shouldExecute = typeof condition === 'function' ? condition(this._text) : condition;
    
    if (shouldExecute) {
      return operation(this);
    }
    
    return this;
  }

  /**
   * 分支处理
   */
  branch(
    condition: boolean | ((text: string) => boolean),
    trueOperation: (chain: RegexChain) => RegexChain,
    falseOperation?: (chain: RegexChain) => RegexChain
  ): RegexChain {
    const shouldExecuteTrue = typeof condition === 'function' ? condition(this._text) : condition;
    
    if (shouldExecuteTrue) {
      return trueOperation(this);
    } else if (falseOperation) {
      return falseOperation(this);
    }
    
    return this;
  }

  /**
   * 调试输出
   */
  debug(label?: string): RegexChain {
    const debugLabel = label || `Debug[${this._operations.length}]`;
    console.log(`[${debugLabel}] 文本: "${this._text}"`);
    console.log(`[${debugLabel}] 操作历史: ${this._operations.join(' -> ')}`);
    console.log(`[${debugLabel}] 元数据:`, this.metadata);
    return this;
  }

  /**
   * 克隆当前链
   */
  clone(): RegexChain {
    const cloned = new RegexChain(this._text, this._rx, this._options);
    cloned._operations = [...this._operations];
    return cloned;
  }

  /**
   * 重置到初始状态
   */
  reset(): RegexChain {
    this._text = '';
    this._operations = [];
    return this;
  }

  /**
   * 获取最终结果
   */
  result(): ChainResult {
    return {
      text: this._text,
      operations: [...this._operations],
      metadata: { ...this.metadata }
    };
  }

  /**
   * 转换为字符串
   */
  toString(): string {
    return this._text;
  }

  /**
   * 转换为JSON
   */
  toJSON(): ChainResult {
    return this.result();
  }

  /**
   * 获取操作摘要
   */
  summary(): string {
    const { originalLength, currentLength, operationCount } = this.metadata;
    const lengthChange = currentLength - originalLength;
    const changeSymbol = lengthChange > 0 ? '+' : '';
    
    return `操作数: ${operationCount}, 长度变化: ${changeSymbol}${lengthChange} (${originalLength} -> ${currentLength})`;
  }
}

/**
 * 创建链式调用实例
 */
export function createChain(text: string, rx: RegexCenter, options?: ChainOptions): RegexChain {
  return new RegexChain(text, rx, options);
}

/**
 * 快捷链式调用函数
 */
export function chain(text: string, rx: RegexCenter, options?: ChainOptions): RegexChain {
  return new RegexChain(text, rx, options);
}
