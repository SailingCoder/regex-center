/**
 * 集成测试
 * 测试实际使用场景和完整的工作流程
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

function runIntegrationTests() {
  console.log('开始集成测试\n');
  
  const test = new TestRunner('集成测试');

  // 场景1: 用户注册表单验证
  console.log('场景1: 用户注册表单验证');
  function validateRegistrationForm(userData) {
    const errors = [];
    
    if (!rx.test('email', userData.email)) {
      errors.push('邮箱格式错误');
    }
    
    if (!rx.test('phone:CN', userData.phone)) {
      errors.push('手机号格式错误');
    }
    
    if (!rx.test('username', userData.username)) {
      errors.push('用户名格式错误');
    }
    
    // 检查密码强度（如果存在）
    try {
      if (!rx.test('password:strong', userData.password)) {
        errors.push('密码强度不够');
      }
    } catch (e) {
      // 如果密码类型不存在，使用基本检查
      if (!userData.password || userData.password.length < 8) {
        errors.push('密码长度至少8位');
      }
    }
    
    return errors;
  }

  // 测试有效的注册数据
  const validUser = {
    email: 'user@example.com',
    phone: '13800138000',
    username: 'user123',
    password: 'Password123!'
  };
  
  const validErrors = validateRegistrationForm(validUser);
  test.assertEqual(validErrors.length, 0, '有效用户数据应该没有错误');

  // 测试无效的注册数据
  const invalidUser = {
    email: 'invalid-email',
    phone: '123',
    username: 'a',
    password: '123'
  };
  
  const invalidErrors = validateRegistrationForm(invalidUser);
  test.assert(invalidErrors.length > 0, '无效用户数据应该有错误');

  // 场景2: 数据清洗和处理
  console.log('\n场景2: 数据清洗和处理');
  function cleanUserData(rawData) {
    // 提取所有邮箱
    const emails = rx.extractAll('email', rawData);
    
    // 提取所有手机号
    const phones = rx.extractAll('phone:CN', rawData);
    
    // 提取所有URL
    const urls = rx.extractAll('url', rawData);
    
    // 脱敏处理
    let cleanedData = rawData;
    cleanedData = rx.replaceAll('phone:CN', cleanedData, match => 
      match.slice(0, 3) + '****' + match.slice(-4)
    );
    cleanedData = rx.replaceAll('email', cleanedData, match => {
      const [user, domain] = match.split('@');
      return user.charAt(0) + '***@' + domain;
    });
    
    return {
      emails,
      phones,
      urls,
      cleanedData,
      stats: {
        emailCount: emails.length,
        phoneCount: phones.length,
        urlCount: urls.length
      }
    };
  }

  const rawData = `
    用户信息：
    张三 - user1@company.com - 13800138000 - https://github.com/user1
    李四 - user2@company.com - 13900139000 - https://gitlab.com/user2
    王五 - user3@company.com - 13700137000
  `;

  const cleaned = cleanUserData(rawData);
  test.assert(cleaned.emails.length >= 3, '应该提取到至少3个邮箱');
  test.assert(cleaned.phones.length >= 3, '应该提取到至少3个手机号');
  test.assert(cleaned.cleanedData.includes('****'), '应该包含脱敏的手机号');
  test.assert(cleaned.cleanedData.includes('***@'), '应该包含脱敏的邮箱');

  // 场景3: 日志分析系统
  console.log('\n场景3: 日志分析系统');
  function analyzeLogFile(logContent) {
    const analysis = {
      ipAddresses: rx.extractAll('ip:v4', logContent),
      userEmails: rx.extractAll('email', logContent),
      ipCount: rx.count('ip:v4', logContent),
      emailCount: rx.count('email', logContent),
      uniqueIPs: new Set(rx.extractAll('ip:v4', logContent)).size,
      
      // 查找可疑活动
      suspiciousIPs: [],
      loginEvents: 0
    };
    
    // 统计登录事件
    analysis.loginEvents = (logContent.match(/login/gi) || []).length;
    
    // 查找可疑IP（出现次数超过10次的）
    const ipCounts = {};
    analysis.ipAddresses.forEach(ip => {
      ipCounts[ip] = (ipCounts[ip] || 0) + 1;
    });
    
    analysis.suspiciousIPs = Object.entries(ipCounts)
      .filter(([ip, count]) => count > 3)
      .map(([ip, count]) => ({ ip, count }));
    
    return analysis;
  }

  const logContent = `
    2024-01-01 10:00:01 INFO User admin@company.com login from 192.168.1.100
    2024-01-01 10:01:15 INFO User user1@company.com login from 192.168.1.101
    2024-01-01 10:02:30 WARN Failed login attempt from 192.168.1.100
    2024-01-01 10:03:45 INFO User user2@company.com login from 192.168.1.102
    2024-01-01 10:04:00 ERROR Multiple failed logins from 192.168.1.100
    2024-01-01 10:05:15 INFO User admin@company.com logout from 192.168.1.100
  `;

  const logAnalysis = analyzeLogFile(logContent);
  test.assert(logAnalysis.ipCount > 0, '应该检测到IP地址');
  test.assert(logAnalysis.emailCount > 0, '应该检测到邮箱地址');
  test.assert(logAnalysis.uniqueIPs > 0, '应该有唯一IP统计');
  test.assert(logAnalysis.loginEvents > 0, '应该检测到登录事件');

  // 场景4: 内容审核系统
  console.log('\n场景4: 内容审核系统');
  function moderateContent(content) {
    const moderation = {
      hasPersonalInfo: false,
      hasSensitiveData: false,
      cleanContent: content,
      violations: []
    };
    
    // 检查是否包含手机号
    if (rx.count('phone:CN', content) > 0) {
      moderation.hasPersonalInfo = true;
      moderation.violations.push('包含手机号');
      moderation.cleanContent = rx.replaceAll('phone:CN', moderation.cleanContent, '[手机号已隐藏]');
    }
    
    // 检查是否包含邮箱
    if (rx.count('email', content) > 0) {
      moderation.hasPersonalInfo = true;
      moderation.violations.push('包含邮箱');
      moderation.cleanContent = rx.replaceAll('email', moderation.cleanContent, '[邮箱已隐藏]');
    }
    
    // 检查是否包含身份证
    try {
      if (rx.count('idCard:CN', content) > 0) {
        moderation.hasSensitiveData = true;
        moderation.violations.push('包含身份证号');
        moderation.cleanContent = rx.replaceAll('idCard:CN', moderation.cleanContent, '[身份证已隐藏]');
      }
    } catch (e) {
      // 如果身份证类型不存在，跳过
    }
    
    return moderation;
  }

  const userContent = '我的联系方式：手机 13800138000，邮箱 user@example.com';
  const moderated = moderateContent(userContent);
  
  test.assert(moderated.hasPersonalInfo, '应该检测到个人信息');
  test.assert(moderated.violations.length > 0, '应该有违规项目');
  test.assert(moderated.cleanContent.includes('[手机号已隐藏]'), '应该隐藏手机号');
  test.assert(moderated.cleanContent.includes('[邮箱已隐藏]'), '应该隐藏邮箱');

  // 场景5: 数据导入验证
  console.log('\n场景5: 数据导入验证');
  function validateImportData(records) {
    const validation = {
      validRecords: [],
      invalidRecords: [],
      errors: [],
      summary: {
        total: records.length,
        valid: 0,
        invalid: 0
      }
    };
    
    records.forEach((record, index) => {
      const recordErrors = [];
      
      // 验证邮箱
      if (!record.email || !rx.test('email', record.email)) {
        recordErrors.push('邮箱格式错误');
      }
      
      // 验证手机号
      if (!record.phone || !rx.test('phone:CN', record.phone)) {
        recordErrors.push('手机号格式错误');
      }
      
      // 验证URL（可选）
      if (record.website && !rx.test('url', record.website)) {
        recordErrors.push('网站URL格式错误');
      }
      
      if (recordErrors.length === 0) {
        validation.validRecords.push(record);
        validation.summary.valid++;
      } else {
        validation.invalidRecords.push({
          record,
          errors: recordErrors,
          index
        });
        validation.summary.invalid++;
        validation.errors.push(`记录${index + 1}: ${recordErrors.join(', ')}`);
      }
    });
    
    return validation;
  }

  const importRecords = [
    { email: 'user1@example.com', phone: '13800138000', website: 'https://example.com' },
    { email: 'invalid-email', phone: '123', website: 'invalid-url' },
    { email: 'user3@example.com', phone: '13900139000' },
    { email: 'user4@example.com', phone: 'invalid-phone', website: 'https://test.com' }
  ];

  const importValidation = validateImportData(importRecords);
  test.assertEqual(importValidation.summary.total, 4, '应该处理4条记录');
  test.assert(importValidation.summary.valid > 0, '应该有有效记录');
  test.assert(importValidation.summary.invalid > 0, '应该有无效记录');
  test.assert(importValidation.errors.length > 0, '应该有错误信息');

  return test.summary();
}

if (require.main === module) {
  const success = runIntegrationTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runIntegrationTests };
