/**
 * 性能监控工具
 * 监控正则表达式的执行性能
 */

/**
 * 性能统计数据
 */
export interface PerformanceStats {
  /** 总调用次数 */
  totalCalls: number;
  /** 平均执行时间（毫秒） */
  avgExecutionTime: number;
  /** 最大执行时间（毫秒） */
  maxExecutionTime: number;
  /** 最小执行时间（毫秒） */
  minExecutionTime: number;
  /** 最近的执行时间列表 */
  recentTimes: number[];
}

/**
 * 性能监控器
 */
export class PerformanceMonitor {
  private stats: Map<string, PerformanceStats> = new Map();
  private enabled: boolean = false;
  private maxRecentTimes: number = 100;

  /**
   * 启用性能监控
   */
  enable(): void {
    this.enabled = true;
  }

  /**
   * 禁用性能监控
   */
  disable(): void {
    this.enabled = false;
  }

  /**
   * 检查是否启用
   */
  isEnabled(): boolean {
    return this.enabled;
  }
  
  /**
   * 记录执行时间
   */
  recordExecution(key: string, executionTime: number): void {
    if (!this.enabled) return;
    
    let stats = this.stats.get(key);
    if (!stats) {
      stats = {
        totalCalls: 0,
        avgExecutionTime: 0,
        maxExecutionTime: 0,
        minExecutionTime: Infinity,
        recentTimes: []
      };
      this.stats.set(key, stats);
    }
    
    stats.totalCalls++;
    
    // 更新执行时间统计
    stats.maxExecutionTime = Math.max(stats.maxExecutionTime, executionTime);
    stats.minExecutionTime = Math.min(stats.minExecutionTime, executionTime);
    
    // 记录最近的执行时间
    stats.recentTimes.push(executionTime);
    if (stats.recentTimes.length > this.maxRecentTimes) {
      stats.recentTimes.shift();
    }
    
    // 计算平均执行时间
    const totalTime = stats.recentTimes.reduce((sum, time) => sum + time, 0);
    stats.avgExecutionTime = totalTime / stats.recentTimes.length;
  }

  /**
   * 获取统计信息
   */
  getStats(key?: string): Map<string, PerformanceStats> | PerformanceStats | null {
    if (key) {
      return this.stats.get(key) || null;
    }
    return this.stats;
  }

  /**
   * 清除统计信息
   */
  clear(key?: string): void {
    if (key) {
      this.stats.delete(key);
    } else {
      this.stats.clear();
    }
  }

  /**
   * 生成性能报告
   */
  generateReport(): string {
    if (!this.enabled) {
      return 'Performance monitoring is disabled';
    }

    let report = '=== Regex Pack Performance Report ===\n\n';
    
    if (this.stats.size === 0) {
      report += 'No performance data available\n';
      return report;
    }

    for (const [key, stats] of this.stats.entries()) {
      report += `Pattern: ${key}\n`;
      report += `  Total Calls: ${stats.totalCalls}\n`;
      report += `  Avg Execution Time: ${stats.avgExecutionTime.toFixed(4)}ms\n`;
      report += `  Min Execution Time: ${stats.minExecutionTime.toFixed(4)}ms\n`;
      report += `  Max Execution Time: ${stats.maxExecutionTime.toFixed(4)}ms\n`;
      report += `\n`;
    }

    return report;
  }
}

/**
 * 性能测试器
 */
export class PerformanceTester {
  /**
   * 测试正则表达式性能
   */
  static testRegexPerformance(
    patterns: { name: string; regex: RegExp }[],
    testStrings: string[],
    iterations: number = 1000
  ): string {
    const results: Array<{
      name: string;
      totalTime: number;
      avgTime: number;
      minTime: number;
      maxTime: number;
    }> = [];

    for (const pattern of patterns) {
      const times: number[] = [];
      
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        
        for (const testString of testStrings) {
          pattern.regex.test(testString);
        }
        
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const totalTime = times.reduce((sum, time) => sum + time, 0);
      const avgTime = totalTime / times.length;
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);

      results.push({
        name: pattern.name,
        totalTime,
        avgTime,
        minTime,
        maxTime
      });
    }

    // 生成报告
    let report = '=== Regex Performance Comparison ===\n\n';
    
    results
      .sort((a, b) => a.avgTime - b.avgTime)
      .forEach((result, index) => {
        report += `${index + 1}. ${result.name}\n`;
        report += `   Avg: ${result.avgTime.toFixed(4)}ms\n`;
        report += `   Min: ${result.minTime.toFixed(4)}ms\n`;
        report += `   Max: ${result.maxTime.toFixed(4)}ms\n`;
        report += `   Total: ${result.totalTime.toFixed(4)}ms\n\n`;
      });

    return report;
  }
}

/**
 * 全局性能监控实例
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * 性能测量装饰器
 */
export function measurePerformance(key: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const startTime = performance.now();
      const result = method.apply(this, args);
      const endTime = performance.now();
      
      performanceMonitor.recordExecution(
        `${target.constructor.name}.${propertyName}`,
        endTime - startTime
      );
      
      return result;
    };

    return descriptor;
  };
}

/**
 * 获取内存使用情况
 */
export function getMemoryUsage(): string {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage();
    return `RSS: ${(usage.rss / 1024 / 1024).toFixed(2)}MB, Heap Used: ${(usage.heapUsed / 1024 / 1024).toFixed(2)}MB`;
  }
  
  if (typeof performance !== 'undefined' && (performance as any).memory) {
    const memory = (performance as any).memory;
    return `Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB, Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`;
  }
  
  return 'Memory usage information not available';
}