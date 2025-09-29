/**
 * 基础API功能测试
 * 测试核心的 get、test、info、list 等基础功能
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

  assertType(value, expectedType, message) {
    const actualType = typeof value;
    const condition = actualType === expectedType;
    if (!condition) {
      message += ` (期望类型: ${expectedType}, 实际类型: ${actualType})`;
    }
    this.assert(condition, message);
  }

  assertInstanceOf(value, expectedClass, message) {
    const condition = value instanceof expectedClass;
    if (!condition) {
      message += ` (期望: ${expectedClass.name}实例, 实际: ${value?.constructor?.name || typeof value})`;
    }
    this.assert(condition, message);
  }

  assertThrows(fn, message) {
    try {
      fn();
      this.failed++;
      this.errors.push(message + ' (应该抛出异常但没有)');
      console.log(`  ❌ ${message} (应该抛出异常但没有)`);
    } catch (error) {
      this.passed++;
      console.log(`  ✅ ${message}`);
    }
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

function runBasicApiTests() {
  console.log('开始基础API测试\n');
  
  const test = new TestRunner('基础API');

  // 测试 rx 对象存在性
  console.log('测试 rx 对象:');
  test.assertType(rx, 'object', 'rx 应该是一个对象');
  test.assertType(rx.test, 'function', 'rx.test 应该是一个函数');
  test.assertType(rx.get, 'function', 'rx.get 应该是一个函数');
  test.assertType(rx.info, 'function', 'rx.info 应该是一个函数');
  test.assertType(rx.list, 'function', 'rx.list 应该是一个函数');

  // 测试 get 方法
  console.log('\n测试 get 方法:');
  try {
    const emailRegex = rx.get('email');
    test.assertInstanceOf(emailRegex, RegExp, 'get("email") 应该返回 RegExp 对象');
    
    const phoneRegex = rx.get('phone:CN');
    test.assertInstanceOf(phoneRegex, RegExp, 'get("phone:CN") 应该返回 RegExp 对象');
  } catch (error) {
    test.failed++;
    test.errors.push(`get方法测试失败: ${error.message}`);
    console.log(`  ❌ get方法测试失败: ${error.message}`);
  }

  // 测试 test 方法 - 基础验证
  console.log('\n测试 test 方法:');
  
  // 邮箱测试
  test.assertEqual(rx.test('email', 'user@example.com'), true, '基础邮箱验证');
  test.assertEqual(rx.test('email', 'invalid-email'), false, '无效邮箱应该返回false');
  
  // 手机号测试
  test.assertEqual(rx.test('phone:CN', '13800138000'), true, '中国手机号验证');
  test.assertEqual(rx.test('phone:CN', '12345'), false, '无效手机号应该返回false');
  
  // URL测试
  test.assertEqual(rx.test('url', 'https://example.com'), true, 'HTTPS URL验证');
  test.assertEqual(rx.test('url', 'invalid-url'), false, '无效URL应该返回false');

  // 测试 info 方法
  console.log('\n测试 info 方法:');
  try {
    const emailInfo = rx.info('email');
    test.assertType(emailInfo, 'object', 'info("email") 应该返回对象');
    test.assertEqual(emailInfo.type, 'email', 'info返回的type应该正确');
    test.assert(Array.isArray(emailInfo.groups), 'info返回的groups应该是数组');
  } catch (error) {
    test.failed++;
    test.errors.push(`info方法测试失败: ${error.message}`);
    console.log(`  ❌ info方法测试失败: ${error.message}`);
  }

  // 测试 list 方法
  console.log('\n测试 list 方法:');
  try {
    const allTypes = rx.list();
    test.assert(Array.isArray(allTypes), 'list() 应该返回数组');
    test.assert(allTypes.length > 0, 'list() 返回的数组应该不为空');
    
    // 检查数组元素结构
    if (allTypes.length > 0) {
      const firstType = allTypes[0];
      test.assertType(firstType.type, 'string', '类型对象应该有type字段');
      test.assert(Array.isArray(firstType.groups), '类型对象应该有groups数组');
    }
  } catch (error) {
    test.failed++;
    test.errors.push(`list方法测试失败: ${error.message}`);
    console.log(`  ❌ list方法测试失败: ${error.message}`);
  }

  // 测试错误处理
  console.log('\n测试错误处理:');
  test.assertThrows(() => rx.get('nonexistent-type'), '获取不存在的类型应该抛出异常');
  test.assertEqual(rx.test('nonexistent-type', 'test'), false, '测试不存在的类型应该返回false');

  // 测试参数类型验证
  console.log('\n测试参数验证:');
  test.assertEqual(rx.test('email', null), false, 'null值应该返回false');
  test.assertEqual(rx.test('email', undefined), false, 'undefined值应该返回false');
  test.assertEqual(rx.test('email', ''), false, '空字符串应该返回false');

  return test.summary();
}

if (require.main === module) {
  const success = runBasicApiTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runBasicApiTests };
