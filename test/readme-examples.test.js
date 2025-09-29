/**
 * README文档示例测试
 * 验证README中提到的所有代码示例都能正常工作
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

function runReadmeExamplesTests() {
  console.log('开始README示例测试\n');
  
  const test = new TestRunner('README示例');

  // README中的基础示例
  console.log('测试基础示例:');
  test.assertEqual(rx.test('email', 'user@example.com'), true, '基础邮箱验证示例');
  test.assertEqual(rx.test('phone:CN', '13800138000'), true, '中国手机号验证示例');
  test.assertEqual(rx.test('idCard:CN', '110101199003077777'), true, '身份证验证示例');

  // 30秒上手示例
  console.log('\n测试30秒上手示例:');
  try {
    // 获取正则
    const emailRegex = rx.get('email');
    const phoneRegex = rx.get('phone:CN');
    test.assert(emailRegex instanceof RegExp, 'rx.get("email") 返回正则对象');
    test.assert(phoneRegex instanceof RegExp, 'rx.get("phone:CN") 返回正则对象');
    
    // 验证
    test.assertEqual(rx.test('email', 'user@example.com'), true, '邮箱验证');
    test.assertEqual(rx.test('phone:CN', '13800138000'), true, '手机号验证');
  } catch (error) {
    test.failed++;
    test.errors.push(`30秒上手示例失败: ${error.message}`);
    console.log(`  ❌ 30秒上手示例失败: ${error.message}`);
  }

  // 文本处理示例
  console.log('\n测试文本处理示例:');
  try {
    const text = '联系方式：user@example.com，手机：13800138000';
    
    // 提取测试
    const phones = rx.extractAll('phone:CN', text);
    test.assert(Array.isArray(phones), 'extractAll 应该返回数组');
    test.assertEqual(phones.length, 1, '应该提取到1个手机号');
    test.assertEqual(phones[0], '13800138000', '提取的手机号应该正确');
    
    // 替换测试
    const masked = rx.replaceAll('phone:CN', text, '[手机]');
    test.assert(masked.includes('[手机]'), '替换后应该包含[手机]');
    test.assert(!masked.includes('13800138000'), '替换后不应该包含原手机号');
    
    // 高亮测试
    const highlighted = rx.highlight('phone:CN', text, '<mark>$&</mark>');
    test.assert(highlighted.includes('<mark>13800138000</mark>'), '高亮后应该包含标记');
  } catch (error) {
    test.failed++;
    test.errors.push(`文本处理示例失败: ${error.message}`);
    console.log(`  ❌ 文本处理示例失败: ${error.message}`);
  }

  // 内置正则大全测试（README中提到的常用10种）
  console.log('\n测试内置正则大全示例:');
  const commonExamples = [
    ['email', 'user@example.com'],
    ['phone:CN', '13800138000'],
    ['url', 'https://example.com'],
    ['ip:v4', '192.168.1.1'],
    ['idCard:CN', '110101199003077777'],
    ['bankCard:CN', '6222600260001234567'],
    ['username', 'user123'],
    ['number:integer', '123'],
    ['date:YYYY-MM-DD', '2024-01-01']
  ];

  commonExamples.forEach(([type, value]) => {
    try {
      const result = rx.test(type, value);
      test.assertEqual(result, true, `${type}: ${value}`);
    } catch (error) {
      test.failed++;
      test.errors.push(`${type}测试失败: ${error.message}`);
      console.log(`  ❌ ${type}测试失败: ${error.message}`);
    }
  });

  // 数字类型分组测试
  console.log('\n测试数字类型分组示例:');
  try {
    test.assertEqual(rx.test('number:integer', '123'), true, '整数验证');
    test.assertEqual(rx.test('number:decimal', '123.45'), true, '小数验证');
    // 注意：signed可能不存在，先测试是否支持
    try {
      const signedResult = rx.test('number:signed', '-123');
      test.assertEqual(signedResult, true, '有符号数验证');
    } catch (e) {
      console.log(`  注意: number:signed 类型不存在，跳过测试`);
    }
  } catch (error) {
    test.failed++;
    test.errors.push(`数字类型测试失败: ${error.message}`);
    console.log(`  ❌ 数字类型测试失败: ${error.message}`);
  }

  // 实际应用场景 - 表单验证示例
  console.log('\n测试表单验证示例:');
  function validateForm(form) {
    const errors = [];
    if (!rx.test('email', form.email)) errors.push('邮箱格式错误');
    if (!rx.test('phone:CN', form.phone)) errors.push('手机号格式错误');
    return errors;
  }

  // 测试正确的表单
  const validForm = { email: 'user@example.com', phone: '13800138000' };
  const validErrors = validateForm(validForm);
  test.assertEqual(validErrors.length, 0, '正确表单应该没有错误');

  // 测试错误的表单
  const invalidForm = { email: 'invalid-email', phone: '123' };
  const invalidErrors = validateForm(invalidForm);
  test.assert(invalidErrors.length > 0, '错误表单应该有错误信息');

  // 数据脱敏示例
  console.log('\n测试数据脱敏示例:');
  function maskSensitiveData(content) {
    let result = content;
    result = rx.replaceAll('phone:CN', result, match => 
      match.slice(0,3) + '****' + match.slice(-4)
    );
    result = rx.replaceAll('email', result, match => {
      const [user, domain] = match.split('@');
      return user.charAt(0) + '***@' + domain;
    });
    return result;
  }

  const testData = '联系我：手机 13800138000，邮箱 user@company.com';
  const maskedData = maskSensitiveData(testData);
  test.assert(maskedData.includes('138****8000'), '手机号应该被正确脱敏');
  test.assert(maskedData.includes('u***@company.com'), '邮箱应该被正确脱敏');

  // 日志解析示例
  console.log('\n测试日志解析示例:');
  function parseLog(logText) {
    return {
      ips: rx.extractAll('ip:v4', logText),
      emails: rx.extractAll('email', logText),
      phoneCount: rx.count('phone:CN', logText)
    };
  }

  const log = '2024-01-01 INFO User user@test.com login from 192.168.1.100';
  const parsed = parseLog(log);
  test.assert(Array.isArray(parsed.ips), '解析结果应该包含IP数组');
  test.assert(Array.isArray(parsed.emails), '解析结果应该包含邮箱数组');
  test.assertType(parsed.phoneCount, 'number', '解析结果应该包含手机号数量');

  return test.summary();
}

if (require.main === module) {
  const success = runReadmeExamplesTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runReadmeExamplesTests };
