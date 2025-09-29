/**
 * 测试运行器
 * 运行所有测试套件并生成汇总报告
 */

const { runBasicApiTests } = require('./basic-api.test.js');
const { runReadmeExamplesTests } = require('./readme-examples.test.js');
const { runAdvancedFeaturesTests } = require('./advanced-features.test.js');
const { runIntegrationTests } = require('./integration.test.js');
const { runPerformanceTests } = require('./performance.test.js');

class TestSuite {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  async runTest(testName, testFunction) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`开始运行: ${testName}`);
    console.log(`${'='.repeat(60)}`);
    
    const start = Date.now();
    let success = false;
    let error = null;
    
    try {
      success = await Promise.resolve(testFunction());
    } catch (e) {
      error = e;
      success = false;
    }
    
    const duration = Date.now() - start;
    
    const result = {
      name: testName,
      success,
      duration,
      error: error ? error.message : null
    };
    
    this.results.push(result);
    
    console.log(`\n${testName} 完成 (耗时: ${duration}ms) - ${success ? '✅ 成功' : '❌ 失败'}`);
    if (error) {
      console.log(`错误: ${error.message}`);
    }
    
    return result;
  }

  generateReport() {
    const totalDuration = Date.now() - this.startTime;
    const successCount = this.results.filter(r => r.success).length;
    const failCount = this.results.length - successCount;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`测试汇总报告`);
    console.log(`${'='.repeat(60)}`);
    
    console.log(`\n测试概览:`);
    console.log(`  总测试套件: ${this.results.length}`);
    console.log(`  ✅ 成功: ${successCount}`);
    console.log(`  ❌ 失败: ${failCount}`);
    console.log(`  总耗时: ${(totalDuration / 1000).toFixed(2)}秒`);
    console.log(`  成功率: ${(successCount / this.results.length * 100).toFixed(1)}%`);
    
    console.log(`\n详细结果:`);
    console.log('┌─────────────────────────────┬──────────┬──────────┬────────────┐');
    console.log('│ 测试套件                    │   状态   │  耗时ms  │    备注    │');
    console.log('├─────────────────────────────┼──────────┼──────────┼────────────┤');
    
    this.results.forEach(result => {
      const name = result.name.padEnd(27);
      const status = result.success ? '  ✅ 成功  ' : '  ❌ 失败  ';
      const duration = result.duration.toString().padStart(8);
      const note = result.error ? result.error.substring(0, 10) + '...' : '正常';
      const noteFormatted = note.padEnd(10);
      
      console.log(`│ ${name} │${status}│ ${duration} │ ${noteFormatted} │`);
    });
    
    console.log('└─────────────────────────────┴──────────┴──────────┴────────────┘');
    
    if (failCount > 0) {
      console.log(`\n失败的测试套件:`);
      this.results
        .filter(r => !r.success)
        .forEach(result => {
          console.log(`  ❌ ${result.name}: ${result.error || '未知错误'}`);
        });
    }
    
    console.log(`\n推荐的下一步:`);
    if (failCount === 0) {
      console.log(`  ✅ 所有测试都通过了！项目状态良好。`);
      console.log(`  建议:可以进行生产部署或发布新版本。`);
    } else {
      console.log(`  1. 检查并修复失败的测试`);
      console.log(`  2. 重新运行测试确保修复有效`);
      console.log(`  3. 考虑更新文档或示例代码`);
    }
    
    console.log(`\n测试完成时间: ${new Date().toLocaleString()}`);
    
    return {
      totalTests: this.results.length,
      successCount,
      failCount,
      totalDuration,
      results: this.results
    };
  }
}

async function runAllTests() {
  console.log('Regex Center 测试套件');
  console.log('==================');
  console.log(`开始时间: ${new Date().toLocaleString()}`);
  
  const suite = new TestSuite();
  
  // 按顺序运行所有测试
  await suite.runTest('基础API测试', runBasicApiTests);
  await suite.runTest('README示例测试', runReadmeExamplesTests);
  await suite.runTest('高级功能测试', runAdvancedFeaturesTests);
  await suite.runTest('集成测试', runIntegrationTests);
  
  // 性能测试单独处理，因为它不返回布尔值
  await suite.runTest('性能测试', () => {
    runPerformanceTests();
    return true; // 性能测试总是返回成功
  });
  
  // 生成最终报告
  const report = suite.generateReport();
  
  // 返回适当的退出码
  const exitCode = report.failCount > 0 ? 1 : 0;
  
  if (exitCode === 0) {
    console.log(`\n🎉 所有测试都通过了！`);
  } else {
    console.log(`\n💥 有 ${report.failCount} 个测试套件失败`);
  }
  
  return exitCode;
}

// 如果直接运行此文件
if (require.main === module) {
  runAllTests()
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('测试运行器出现异常:', error);
      process.exit(1);
    });
}

module.exports = { runAllTests, TestSuite };
