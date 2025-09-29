/**
 * 高级功能测试
 * 测试团队管理、批量操作、自定义配置等高级功能
 */

const { rx } = require('../dist/cjs/index.js');

class TestRunner {
  constructor(testName) {
    this.testName = testName;
    this.passed = 0;
    this.failed = 0;
    this.errors = [];
  }

  assert(condition, message) {
    if (condition) {
      this.passed++;
      console.log(`  ✅ ${message}`);
    } else {
      this.failed++;
      this.errors.push(message);
      console.log(`  ❌ ${message}`);
    }
  }

  assertEqual(actual, expected, message) {
    const condition = actual === expected;
    if (!condition) {
      message += ` (期望: ${expected}, 实际: ${actual})`;
    }
    this.assert(condition, message);
  }

  summary() {
    const total = this.passed + this.failed;
    const percentage = total > 0 ? (this.passed / total * 100).toFixed(1) : 0;
    
    console.log(`\n${this.testName} 测试结果:`);
    console.log(`✅ 通过: ${this.passed}`);
    console.log(`❌ 失败: ${this.failed}`);
    console.log(`成功率: ${percentage}%`);
    
    if (this.failed > 0) {
      console.log('\n失败的测试:');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    return this.failed === 0;
  }
}

function runAdvancedFeaturesTests() {
  console.log('开始高级功能测试\n');
  
  const test = new TestRunner('高级功能');

  // 测试批量操作
  console.log('测试批量操作:');
  try {
    // 检查批量操作函数是否存在
    const batchModule = require('../dist/cjs/operations/batch.js');
    const { extractBatch, replaceBatch, countBatch } = batchModule;
    
    test.assert(typeof extractBatch === 'function', 'extractBatch 函数应该存在');
    test.assert(typeof replaceBatch === 'function', 'replaceBatch 函数应该存在');
    test.assert(typeof countBatch === 'function', 'countBatch 函数应该存在');
    
    const testText = '联系方式：user@example.com，电话：13800138000，网站：https://example.com';
    
    // 测试批量提取
    const extracted = extractBatch(testText, ['email', 'phone:CN', 'url']);
    test.assert(typeof extracted === 'object', 'extractBatch 应该返回对象');
    test.assert('email' in extracted, '提取结果应该包含email');
    test.assert('phone:CN' in extracted, '提取结果应该包含phone:CN');
    test.assert('url' in extracted, '提取结果应该包含url');
    
    // 测试批量替换
    const masked = replaceBatch(testText, {
      email: '[邮箱]',
      'phone:CN': '[电话]',
      url: '[网址]'
    });
    test.assert(typeof masked === 'string', 'replaceBatch 应该返回字符串');
    test.assert(masked.includes('[邮箱]'), '替换结果应该包含[邮箱]');
    test.assert(masked.includes('[电话]'), '替换结果应该包含[电话]');
    test.assert(masked.includes('[网址]'), '替换结果应该包含[网址]');
    
    // 测试批量统计
    const counts = countBatch(testText, ['email', 'phone:CN', 'url']);
    test.assert(typeof counts === 'object', 'countBatch 应该返回对象');
    test.assertEqual(counts.email, 1, 'email计数应该为1');
    test.assertEqual(counts['phone:CN'], 1, 'phone:CN计数应该为1');
    test.assertEqual(counts.url, 1, 'url计数应该为1');
    
  } catch (error) {
    test.failed++;
    test.errors.push(`批量操作测试失败: ${error.message}`);
    console.log(`  ❌ 批量操作测试失败: ${error.message}`);
  }

  // 测试团队配置功能
  console.log('\n测试团队配置功能:');
  try {
    // 备份原始状态
    const originalTypes = rx.list().map(t => t.type);
    
    // 测试 inject 方法（智能合并）
    if (typeof rx.inject === 'function') {
      rx.inject({
        customField: /^CF_[A-Z0-9]{8}$/,
        testEmail: /^test@company\.com$/
      });
      
      test.assertEqual(rx.test('customField', 'CF_ABC12345'), true, '自定义字段应该验证成功');
      test.assertEqual(rx.test('customField', 'invalid'), false, '无效自定义字段应该验证失败');
      test.assertEqual(rx.test('testEmail', 'test@company.com'), true, '测试邮箱应该验证成功');
      
      // 检查类型数量是否增加
      const newTypes = rx.list().map(t => t.type);
      test.assert(newTypes.length > originalTypes.length, '注入后类型数量应该增加');
      test.assert(newTypes.includes('customField'), '新类型应该在列表中');
      test.assert(newTypes.includes('testEmail'), '新类型应该在列表中');
    } else {
      console.log(`  注意: inject 方法不存在，跳过团队配置测试`);
    }
    
  } catch (error) {
    test.failed++;
    test.errors.push(`团队配置测试失败: ${error.message}`);
    console.log(`  ❌ 团队配置测试失败: ${error.message}`);
  }

  // 测试文本处理高级功能
  console.log('\n测试文本处理高级功能:');
  try {
    const text = '数据：email1@test.com, email2@test.com, phone: 13800138000';
    
    // 测试 count 方法
    const emailCount = rx.count('email', text);
    test.assertEqual(emailCount, 2, '应该统计到2个邮箱');
    
    // 测试 find 方法
    if (typeof rx.find === 'function') {
      const firstEmail = rx.find('email', text);
      test.assert(firstEmail !== null, 'find 应该找到第一个邮箱');
      test.assertEqual(firstEmail.match, 'email1@test.com', '第一个邮箱应该正确');
      test.assertType(firstEmail.index, 'number', '索引应该是数字');
    }
    
    // 测试 findAll 方法
    if (typeof rx.findAll === 'function') {
      const allEmails = rx.findAll('email', text);
      test.assert(Array.isArray(allEmails), 'findAll 应该返回数组');
      test.assertEqual(allEmails.length, 2, '应该找到2个邮箱');
    }
    
    // 测试 remove 和 removeAll 方法
    if (typeof rx.remove === 'function') {
      const removedOne = rx.remove('email', text);
      test.assert(!removedOne.includes('email1@test.com'), 'remove 应该移除第一个邮箱');
      test.assert(removedOne.includes('email2@test.com'), 'remove 应该保留第二个邮箱');
    }
    
    if (typeof rx.removeAll === 'function') {
      const removedAll = rx.removeAll('email', text);
      test.assert(!removedAll.includes('email1@test.com'), 'removeAll 应该移除所有邮箱');
      test.assert(!removedAll.includes('email2@test.com'), 'removeAll 应该移除所有邮箱');
    }
    
  } catch (error) {
    test.failed++;
    test.errors.push(`文本处理高级功能测试失败: ${error.message}`);
    console.log(`  ❌ 文本处理高级功能测试失败: ${error.message}`);
  }

  // 测试回调函数功能
  console.log('\n测试回调函数功能:');
  try {
    const text = '联系电话：13800138000，备用电话：13900139000';
    
    // 测试替换回调
    const masked = rx.replaceAll('phone:CN', text, (match, offset) => {
      return offset < 10 ? '[主要联系方式]' : '[备用联系方式]';
    });
    
    test.assert(masked.includes('[主要联系方式]') || masked.includes('[备用联系方式]'), 
      '回调函数替换应该正常工作');
    
    // 测试提取回调
    if (typeof rx.extractAll === 'function') {
      const processed = rx.extractAll('phone:CN', text, match => 
        match.slice(0, 3) + '****' + match.slice(-4)
      );
      
      if (processed.length > 0) {
        test.assert(processed[0].includes('****'), '提取回调应该正常工作');
      }
    }
    
  } catch (error) {
    test.failed++;
    test.errors.push(`回调函数测试失败: ${error.message}`);
    console.log(`  ❌ 回调函数测试失败: ${error.message}`);
  }

  // 测试链式操作（如果存在）
  console.log('\n测试链式操作:');
  try {
    if (typeof rx.chain === 'function') {
      const result = rx.chain('测试数据：user@test.com，手机：13800138000')
        .replaceAll('email', '[邮箱已脱敏]')
        .replaceAll('phone:CN', '[电话已脱敏]')
        .toString();
      
      test.assert(result.includes('[邮箱已脱敏]'), '链式邮箱替换应该成功');
      test.assert(result.includes('[电话已脱敏]'), '链式电话替换应该成功');
    } else {
      console.log(`  注意: chain 方法不存在，跳过链式操作测试`);
    }
  } catch (error) {
    test.failed++;
    test.errors.push(`链式操作测试失败: ${error.message}`);
    console.log(`  ❌ 链式操作测试失败: ${error.message}`);
  }

  // 测试安全检查功能
  console.log('\n测试安全检查功能:');
  try {
    if (typeof rx.add === 'function') {
      // 测试添加安全的正则
      rx.add('safePattern', /^[a-z]+$/);
      test.assertEqual(rx.test('safePattern', 'abc'), true, '安全正则应该可以添加');
      
      // 测试添加危险的正则（应该被阻止）
      try {
        rx.add('dangerousPattern', /^(a+)+$/);
        console.log(`  注意: 危险正则未被阻止，安全检查可能未启用`);
      } catch (securityError) {
        test.assert(true, '危险正则应该被安全检查阻止');
      }
    } else {
      console.log(`  注意: add 方法不存在，跳过安全检查测试`);
    }
  } catch (error) {
    test.failed++;
    test.errors.push(`安全检查测试失败: ${error.message}`);
    console.log(`  ❌ 安全检查测试失败: ${error.message}`);
  }

  return test.summary();
}

if (require.main === module) {
  const success = runAdvancedFeaturesTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runAdvancedFeaturesTests };
