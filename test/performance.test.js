/**
 * 性能测试
 * 测试在大量数据和高频操作下的性能表现
 */

const { rx } = require('../dist/cjs/index.js');

class PerformanceTest {
  constructor(testName) {
    this.testName = testName;
    this.results = [];
  }

  benchmark(name, fn, iterations = 1000) {
    console.log(`\n${name} (${iterations}次)`);
    
    // 预热
    for (let i = 0; i < 10; i++) {
      fn();
    }
    
    const startTime = process.hrtime.bigint();
    const startMemory = process.memoryUsage();
    
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    
    const endTime = process.hrtime.bigint();
    const endMemory = process.memoryUsage();
    
    const duration = Number(endTime - startTime) / 1000000; // 转换为毫秒
    const avgTime = duration / iterations;
    const memoryDiff = endMemory.heapUsed - startMemory.heapUsed;
    
    const result = {
      name,
      iterations,
      totalTime: duration.toFixed(2),
      avgTime: avgTime.toFixed(4),
      memoryDiff: (memoryDiff / 1024 / 1024).toFixed(2) // MB
    };
    
    this.results.push(result);
    
    console.log(`  总时间: ${result.totalTime}ms`);
    console.log(`  平均时间: ${result.avgTime}ms/次`);
    console.log(`  内存变化: ${result.memoryDiff}MB`);
    console.log(`  QPS: ${(iterations / (duration / 1000)).toFixed(0)}/秒`);
    
    return result;
  }

  summary() {
    console.log('\n性能测试总结:');
    console.log('┌─────────────────────────────┬──────────┬──────────┬──────────┬──────────┐');
    console.log('│ 测试项目                    │   次数   │ 总时间ms │ 平均ms   │ 内存MB   │');
    console.log('├─────────────────────────────┼──────────┼──────────┼──────────┼──────────┤');
    
    this.results.forEach(result => {
      const name = result.name.padEnd(27);
      const iterations = result.iterations.toString().padStart(8);
      const totalTime = result.totalTime.padStart(8);
      const avgTime = result.avgTime.padStart(8);
      const memory = result.memoryDiff.padStart(8);
      
      console.log(`│ ${name} │ ${iterations} │ ${totalTime} │ ${avgTime} │ ${memory} │`);
    });
    
    console.log('└─────────────────────────────┴──────────┴──────────┴──────────┴──────────┘');
  }
}

function runPerformanceTests() {
  console.log('开始性能测试\n');
  
  const perf = new PerformanceTest('性能测试');

  // 基础验证性能测试
  console.log('基础验证性能测试:');
  
  perf.benchmark('邮箱验证', () => {
    rx.test('email', 'user@example.com');
  }, 10000);

  perf.benchmark('手机号验证', () => {
    rx.test('phone:CN', '13800138000');
  }, 10000);

  perf.benchmark('URL验证', () => {
    rx.test('url', 'https://example.com');
  }, 10000);

  perf.benchmark('IP地址验证', () => {
    rx.test('ip:v4', '192.168.1.1');
  }, 10000);

  // 文本处理性能测试
  console.log('\n文本处理性能测试:');
  
  const longText = `
    用户数据库导出：
    张三 user1@company.com 13800138000 https://github.com/user1
    李四 user2@company.com 13900139000 https://gitlab.com/user2
    王五 user3@company.com 13700137000 https://bitbucket.com/user3
    赵六 user4@company.com 13600136000 https://codepen.com/user4
    钱七 user5@company.com 13500135000 https://stackoverflow.com/user5
  `.repeat(100); // 创建大量重复数据

  perf.benchmark('提取所有邮箱', () => {
    rx.extractAll('email', longText);
  }, 1000);

  perf.benchmark('提取所有手机号', () => {
    rx.extractAll('phone:CN', longText);
  }, 1000);

  perf.benchmark('统计邮箱数量', () => {
    rx.count('email', longText);
  }, 1000);

  perf.benchmark('替换所有手机号', () => {
    rx.replaceAll('phone:CN', longText, '[隐藏]');
  }, 500);

  // 正则获取性能测试
  console.log('\n正则获取性能测试:');
  
  perf.benchmark('获取邮箱正则', () => {
    rx.get('email');
  }, 10000);

  perf.benchmark('获取分组正则', () => {
    rx.get('phone:CN');
  }, 10000);

  // 批量操作性能测试
  console.log('\n批量操作性能测试:');
  
  try {
    const { extractBatch, replaceBatch, countBatch } = require('../dist/cjs/operations/batch.js');
    
    perf.benchmark('批量提取', () => {
      extractBatch(longText, ['email', 'phone:CN', 'url']);
    }, 500);

    perf.benchmark('批量替换', () => {
      replaceBatch(longText, {
        email: '[邮箱]',
        'phone:CN': '[手机]',
        url: '[网址]'
      });
    }, 200);

    perf.benchmark('批量统计', () => {
      countBatch(longText, ['email', 'phone:CN', 'url']);
    }, 1000);
    
  } catch (error) {
    console.log(`  注意: 批量操作模块不可用: ${error.message}`);
  }

  // 内存压力测试
  console.log('\n内存压力测试:');
  
  const hugeText = longText.repeat(10); // 更大的数据集
  
  perf.benchmark('大数据提取', () => {
    const emails = rx.extractAll('email', hugeText);
    const phones = rx.extractAll('phone:CN', hugeText);
    // 立即释放引用
    emails.length = 0;
    phones.length = 0;
  }, 100);

  // 并发模拟测试
  console.log('\n并发模拟测试:');
  
  perf.benchmark('模拟并发验证', () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(Promise.resolve(rx.test('email', `user${i}@example.com`)));
    }
    return Promise.all(promises);
  }, 500);

  // 复杂场景性能测试
  console.log('\n复杂场景性能测试:');
  
  perf.benchmark('数据清洗流程', () => {
    let data = longText;
    
    // 步骤1: 提取数据
    const emails = rx.extractAll('email', data);
    const phones = rx.extractAll('phone:CN', data);
    
    // 步骤2: 验证数据
    const validEmails = emails.filter(email => rx.test('email', email));
    const validPhones = phones.filter(phone => rx.test('phone:CN', phone));
    
    // 步骤3: 脱敏处理
    data = rx.replaceAll('email', data, match => {
      const [user, domain] = match.split('@');
      return user.charAt(0) + '***@' + domain;
    });
    
    data = rx.replaceAll('phone:CN', data, match => 
      match.slice(0, 3) + '****' + match.slice(-4)
    );
    
    // 返回处理结果统计
    return {
      emailCount: validEmails.length,
      phoneCount: validPhones.length,
      processedLength: data.length
    };
  }, 100);

  // 类型查询性能测试
  console.log('\n类型查询性能测试:');
  
  perf.benchmark('列出所有类型', () => {
    rx.list();
  }, 1000);

  perf.benchmark('查询类型信息', () => {
    rx.info('email');
  }, 5000);

  // 边界条件性能测试
  console.log('\n边界条件性能测试:');
  
  perf.benchmark('空字符串测试', () => {
    rx.test('email', '');
  }, 10000);

  perf.benchmark('超长字符串测试', () => {
    const veryLongString = 'a'.repeat(10000) + '@example.com';
    rx.test('email', veryLongString);
  }, 1000);

  perf.benchmark('特殊字符测试', () => {
    const specialString = '测试@example.com with 🎉 emoji and 特殊字符';
    rx.test('email', 'test@example.com');
    rx.extractAll('email', specialString);
  }, 5000);

  // 显示测试总结
  perf.summary();

  // 内存使用情况
  console.log('\n当前内存使用情况:');
  const memUsage = process.memoryUsage();
  console.log(`  RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);

  // 性能建议
  console.log('\n性能优化建议:');
  console.log('  1. 对于大量数据处理，建议使用批量操作方法');
  console.log('  2. 频繁使用的正则可以通过 rx.get() 缓存到变量中');
  console.log('  3. 避免在循环中重复调用 rx.test() 进行相同类型的验证');
  console.log('  4. 大文本处理时考虑分块处理以控制内存使用');
  console.log('  5. 生产环境建议启用正则缓存机制');

  return true;
}

if (require.main === module) {
  runPerformanceTests();
}

module.exports = { runPerformanceTests };
