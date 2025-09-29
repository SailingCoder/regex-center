/**
 * 正则表达式操作模块
 * 
 * 推荐使用：直接使用 rx 实例的方法（API 更一致）
 * import { rx } from 'regex-center';
 * rx.extract(text, 'email');
 * rx.replaceAll(text, 'phone', 'XXX-XXXX-XXXX');
 * 
 * 高级功能：按需导入独立模块
 * import { extractBatch } from 'regex-center/operations/batch';
 * import { highlight } from 'regex-center/operations/highlight';
 */

// 说明：核心操作已集成到 rx 实例中
// 如需使用，请参考：
// import { rx } from 'regex-center';
// rx.extract(), rx.extractAll(), rx.replace(), rx.replaceAll()
// rx.count(), rx.find(), rx.remove(), rx.highlight()

// 批量操作 - 简洁高效的同步版本
export { 
  extractBatch, 
  replaceBatch, 
  countBatch,
  // 类型定义
  BatchExtractResult,
  BatchCountResult
} from './batch';

// 高亮操作
export { highlight, highlightConsole } from './highlight';
export { split, splitBy, remove, keep, clean } from './utils';