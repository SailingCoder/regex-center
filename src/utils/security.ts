/**
 * 正则表达式安全检查工具
 * 防护 ReDoS (Regular Expression Denial of Service) 攻击
 */

/**
 * 安全检查报告
 */
export interface SecurityReport {
  /** 是否安全 */
  isSafe: boolean;
  /** 风险等级 */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  /** 警告信息 */
  warnings: string[];
  /** 建议 */
  recommendations: string[];
  /** 检查详情 */
  details: {
    /** 是否有嵌套量词 */
    hasNestedQuantifiers: boolean;
    /** 是否有重复组 */
    hasRepeatingGroups: boolean;
    /** 是否有回溯风险 */
    hasBacktrackingRisk: boolean;
    /** 复杂度评分 */
    complexityScore: number;
  };
}

/**
 * 正则表达式安全检查器
 */
export class RegexSecurityChecker {
  
  /**
   * 检查正则表达式安全性
   */
  static checkSafety(pattern: RegExp): SecurityReport {
    const source = pattern.source;
    const report: SecurityReport = {
      isSafe: true,
      riskLevel: 'low',
      warnings: [],
      recommendations: [],
      details: {
        hasNestedQuantifiers: false,
        hasRepeatingGroups: false,
        hasBacktrackingRisk: false,
        complexityScore: 0
      }
    };
    
    // 检查嵌套量词
    if (this.hasNestedQuantifiers(source)) {
      report.details.hasNestedQuantifiers = true;
      report.warnings.push('Detected nested quantifiers which may cause exponential backtracking');
      report.recommendations.push('Consider using atomic groups or possessive quantifiers');
      report.details.complexityScore += 30;
    }
    
    // 检查重复组
    if (this.hasRepeatingGroups(source)) {
      report.details.hasRepeatingGroups = true;
      report.warnings.push('Detected repeating groups that may cause performance issues');
      report.recommendations.push('Consider optimizing group patterns');
      report.details.complexityScore += 20;
    }
    
    // 检查回溯风险
    if (this.hasBacktrackingRisk(source)) {
      report.details.hasBacktrackingRisk = true;
      report.warnings.push('Pattern may cause catastrophic backtracking');
      report.recommendations.push('Use more specific patterns or atomic groups');
      report.details.complexityScore += 40;
    }
    
    // 检查复杂度
    const complexity = this.calculateComplexity(source);
    report.details.complexityScore += complexity;
    
    // 确定风险等级
    if (report.details.complexityScore >= 80) {
      report.riskLevel = 'critical';
      report.isSafe = false;
    } else if (report.details.complexityScore >= 60) {
      report.riskLevel = 'high';
      report.isSafe = false;
    } else if (report.details.complexityScore >= 40) {
      report.riskLevel = 'medium';
    } else {
      report.riskLevel = 'low';
    }
    
    return report;
  }
  
  /**
   * 检查是否有嵌套量词
   */
  private static hasNestedQuantifiers(source: string): boolean {
    // 检查 (a+)+ 或 (a*)* 等模式
    const nestedQuantifierPattern = /\([^)]*[+*?][^)]*\)[+*?]/;
    return nestedQuantifierPattern.test(source);
  }
  
  /**
   * 检查是否有重复组
   */
  private static hasRepeatingGroups(source: string): boolean {
    // 检查 (a|a)+ 等模式
    const repeatingGroupPattern = /\([^)]*\|[^)]*\)[+*]/;
    return repeatingGroupPattern.test(source);
  }
  
  /**
   * 检查回溯风险
   */
  private static hasBacktrackingRisk(source: string): boolean {
    // 检查可能导致回溯的模式
    const riskyPatterns = [
      /\([^)]*\.\*[^)]*\)[+*?]/, // (.*)+
      /\([^)]*\.\+[^)]*\)[+*?]/, // (.+)+
      /\([^)]*[+*?][^)]*\)[+*?]/, // 嵌套量词
      /\([^)]*\|[^)]*\)[+*?].*\([^)]*\|[^)]*\)[+*?]/, // 多个选择组
    ];
    
    return riskyPatterns.some(pattern => pattern.test(source));
  }
  
  /**
   * 计算复杂度评分
   */
  private static calculateComplexity(source: string): number {
    let score = 0;
    
    // 量词数量
    const quantifiers = source.match(/[+*?{}]/g) || [];
    score += quantifiers.length * 2;
    
    // 组数量
    const groups = source.match(/\(/g) || [];
    score += groups.length * 3;
    
    // 选择操作符数量
    const alternations = source.match(/\|/g) || [];
    score += alternations.length * 5;
    
    // 字符类数量
    const charClasses = source.match(/\[[^\]]*\]/g) || [];
    score += charClasses.length * 2;
    
    // 长度惩罚
    if (source.length > 100) {
      score += Math.floor(source.length / 10);
    }
    
    return score;
  }
  
  /**
   * 测试正则表达式性能
   */
  static testPerformance(pattern: RegExp, testString: string, timeout: number = 1000): {
    executionTime: number;
    timedOut: boolean;
    result: boolean | null;
  } {
    const start = performance.now();
    let result: boolean | null = null;
    let timedOut = false;
    
    try {
      const timeoutId = setTimeout(() => {
        timedOut = true;
      }, timeout);
      
      result = pattern.test(testString);
      clearTimeout(timeoutId);
    } catch (error) {
      // 处理错误
    }
    
    const executionTime = performance.now() - start;
    
    return {
      executionTime,
      timedOut,
      result: timedOut ? null : result
    };
  }
  
  /**
   * 生成安全的正则表达式建议
   */
  static generateSafeSuggestion(pattern: RegExp): string | null {
    const source = pattern.source;
    
    // 简单的优化建议
    let suggestion = source;
    
    // 替换 (.*) 为更具体的模式
    suggestion = suggestion.replace(/\(\.\*\)/g, '([^\\s]*)');
    
    // 替换 (.+) 为更具体的模式
    suggestion = suggestion.replace(/\(\.\+\)/g, '([^\\s]+)');
    
    // 添加边界
    if (!suggestion.startsWith('^') && !suggestion.startsWith('\\b')) {
      suggestion = '^' + suggestion;
    }
    if (!suggestion.endsWith('$') && !suggestion.endsWith('\\b')) {
      suggestion = suggestion + '$';
    }
    
    return suggestion !== source ? suggestion : null;
  }
}

/**
 * 安全的正则表达式执行器
 */
export class SafeRegexExecutor {
  private timeout: number;
  
  constructor(timeout: number = 1000) {
    this.timeout = timeout;
  }
  
  /**
   * 安全执行正则测试
   */
  safeTest(pattern: RegExp, input: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const worker = this.createWorker(pattern, input, 'test');
      
      const timeoutId = setTimeout(() => {
        worker.terminate();
        reject(new Error('Regex execution timeout'));
      }, this.timeout);
      
      worker.onmessage = (e: MessageEvent) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve(e.data.result);
      };
      
      worker.onerror = (error: any) => {
        clearTimeout(timeoutId);
        worker.terminate();
        reject(error);
      };
    });
  }
  
  /**
   * 安全执行正则匹配
   */
  safeMatch(pattern: RegExp, input: string): Promise<RegExpMatchArray | null> {
    return new Promise((resolve, reject) => {
      const worker = this.createWorker(pattern, input, 'match');
      
      const timeoutId = setTimeout(() => {
        worker.terminate();
        reject(new Error('Regex execution timeout'));
      }, this.timeout);
      
      worker.onmessage = (e: MessageEvent) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve(e.data.result);
      };
      
      worker.onerror = (error: any) => {
        clearTimeout(timeoutId);
        worker.terminate();
        reject(error);
      };
    });
  }
  
  /**
   * 创建 Web Worker 执行正则表达式
   */
  private createWorker(pattern: RegExp, input: string, operation: 'test' | 'match'): any {
    const workerCode = `
      self.onmessage = function(e) {
        const { pattern, input, operation } = e.data;
        const regex = new RegExp(pattern.source, pattern.flags);
        
        try {
          let result;
          if (operation === 'test') {
            result = regex.test(input);
          } else if (operation === 'match') {
            result = input.match(regex);
          }
          
          self.postMessage({ result });
        } catch (error) {
          self.postMessage({ error: error.message });
        }
      };
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new (globalThis as any).Worker(URL.createObjectURL(blob));
    
    worker.postMessage({
      pattern: { source: pattern.source, flags: pattern.flags },
      input,
      operation
    });
    
    return worker;
  }
}

/**
 * 正则表达式黑名单
 * 包含已知的危险正则表达式模式
 */
export const DANGEROUS_PATTERNS = [
  /\(.*\)\*/, // (.*)*
  /\(.*\)\+/, // (.*)+ 
  /\(.+\)\*/, // (.+)*
  /\(.+\)\+/, // (.+)+
  /\([^)]*\|[^)]*\)\*/, // (a|a)*
  /\([^)]*\|[^)]*\)\+/, // (a|a)+
];

/**
 * 检查正则表达式是否在黑名单中
 */
export function isBlacklisted(pattern: RegExp): boolean {
  const source = pattern.source;
  return DANGEROUS_PATTERNS.some(dangerous => dangerous.test(source));
}

/**
 * 创建安全的正则表达式
 */
export function createSafeRegex(source: string, flags?: string): RegExp | null {
  try {
    const pattern = new RegExp(source, flags);
    const report = RegexSecurityChecker.checkSafety(pattern);
    
    if (report.riskLevel === 'critical' || isBlacklisted(pattern)) {
      console.warn('Dangerous regex pattern detected:', source);
      return null;
    }
    
    return pattern;
  } catch (error) {
    console.error('Invalid regex pattern:', source, error);
    return null;
  }
}
