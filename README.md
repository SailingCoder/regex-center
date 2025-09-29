# Regex Kit

[简体中文](https://github.com/SailingCoder/regex-kit/blob/main/README.md) | [English](https://github.com/SailingCoder/regex-kit/blob/main/docs/README_EN.md)

**Regex Kit = 正则 + 管理**，一个专业的正则表达式管理库，让团队和项目的正则变得可管理、可维护、可复用。

🎯 **两大核心价值**：
- **开箱即用**：内置 100+ 精选正则，覆盖常见场景
- **团队管理**：搭建属于你的正则管理体系，统一团队标准

[![npm version](https://badge.fury.io/js/regex-kit.svg)](https://badge.fury.io/js/regex-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)


## 为什么需要正则管理？

写正则时，你是否遇到过这些痛点？

-   **复制粘贴地狱**：每个项目都要重写邮箱、手机号、身份证验证
-   **天书代码**：`/^(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+...$/i` —— 谁能看懂？
-   **维护困难**：正则散落各处，改一个地方要全局搜索
-   **团队不统一**：每个人都在重新写相同的规则，标准不一致
-   **安全风险**：复杂正则容易引发 ReDoS 攻击

## 🎯 Regex Kit 的解决方案

### 安装

```bash
npm install regex-kit
```

### 方案一：直接使用内置正则（开箱即用）
```javascript
// 100+ 内置精选正则，覆盖常见场景
import { rx } from 'regex-kit';

// 获取和验证
rx.get('email');                          // → /^[^\s@]+@[^\s@]+\.[^\s@]+$/
rx.get('phone:CN');                       // → /^1[3-9]\d{9}$/
rx.test('email', 'user@example.com');     // true - 用email规则验证邮箱
rx.test('phone:CN', '13800138000');       // true - 用phone:CN规则验证手机号
rx.test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'user@company.com'); // true - 自定义规则

// 分组支持
rx.test('password:strong', 'Password123!'); // 强密码规则
rx.test('email:enterprise', 'user@company.com'); // 企业邮箱规则

// 文本处理 - 同样的参数顺序
const text = '联系方式：user@example.com，手机：13800138000';
rx.extractAll('phone:CN', text);          // 用phone:CN规则提取手机号
rx.replaceAll('phone:CN', text, '[手机]'); // 用phone:CN规则替换手机号
rx.highlight('phone:CN', text, '<mark>$&</mark>');  // 用phone:CN规则高亮手机号
```

### 方案二：搭建团队正则管理体系（推荐）
```javascript
// 完全替换内置正则，使用你的团队标准
rx.use({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // 只允许公司邮箱
  phone: {
    default: 'mobile',
    mobile: /^1[3-9]\d{9}$/,              // 手机号
    landline: /^0\d{2,3}-?\d{7,8}$/       // 座机号
  },
  employeeId: {
    pattern: /^EMP\d{6}$/,
    description: '员工ID：EMP + 6位数字',
    examples: {
      valid: ['EMP123456', 'EMP000001'],
      invalid: ['emp123456', 'EMP12345']
    }
  }
});

// 现在只有你定义的正则可用，借助 Regex Kit 的管理能力
rx.get('email') // 获取邮箱正则 /^[a-z0-9._%+-]+@company\.com$/
rx.get('phone:mobile'); // 获取 /^1[3-9]\d{9}$/
rx.test('email', 'user@company.com');     // true
rx.test('email', 'user@gmail.com');       // false
rx.info('employeeId');                    // 查看规则说明
```

## 核心特性

- **语义化 API**：`rx.test('email', email)` 一看就懂
- **type:group 语法**：`password:strong`、`email:enterprise` 支持多种格式
- **集中管理**：可添加描述和示例，团队统一标准
- **安全防护**：内置 ReDoS 攻击检测，覆盖所有添加方法
- **TypeScript 友好**：完整类型提示
- **链式调用**：流畅的文本处理操作链
- **批量操作**：高效处理多种类型的文本匹配
- **函数式调用**：支持无前缀的函数式API
- **回调函数**：灵活的文本处理回调
- **框架集成**：Vue、React等框架的适配器

## 使用指南

### 1. 内置 100+ 精选正则，开箱即用

如果你担心内置正则有问题或不符合项目需求，可以通过以下方式扩展或完全替换：

**扩展方式（保留内置 + 添加自定义）**：
```javascript
// 智能合并：保留内置正则，添加/覆盖指定类型
rx.inject({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // 覆盖内置email
  customField: /^CF_[A-Z0-9]{8}$/,         // 新增类型
  phone: {                                 // 分组级合并
    CUSTOM: /^9\d{10}$/                    // 新增CUSTOM分组，保留CN、US等
  }
});
```

**替换方式（只用管理能力，不用内置正则）**：
```javascript
// 完全替换：清空内置，使用全新配置
rx.use({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // 只允许公司邮箱
  phone: {                                 // 支持分组配置
    default: 'mobile',
    mobile: /^1[3-9]\d{9}$/,              // 手机号
    landline: /^0\d{2,3}-?\d{7,8}$/       // 座机号
  }
});
// 现在只有这些类型可用，借助 Regex Kit 的管理能力
```

**常用内置正则一览**：
| 类型 | 语法 | 说明 | 示例 |
|------|------|------|------|
| **邮箱** | `email` | 基础邮箱格式 | `rx.test('email', 'user@example.com')` |
| | `email:strict` | 严格邮箱格式 | `rx.test('email:strict', 'user@company.com')` |
| | `email:enterprise` | 企业邮箱格式 | `rx.test('email:enterprise', 'admin@company.com')` |
| **手机号** | `phone:CN` | 中国手机号 | `rx.test('phone:CN', '13800138000')` |
| | `phone:US` | 美国手机号 | `rx.test('phone:US', '+1-555-123-4567')` |
| **身份证** | `idCard:CN` | 中国身份证 | `rx.test('idCard:CN', '110101199003077777')` |
| **银行卡** | `bankCard:CN` | 中国银行卡 | `rx.test('bankCard:CN', '6222600260001234567')` |
| **URL** | `url` | 基础URL格式 | `rx.test('url', 'https://example.com')` |
| **IP地址** | `ip:v4` | IPv4地址 | `rx.test('ip:v4', '192.168.1.1')` |
| | `ip:v6` | IPv6地址 | `rx.test('ip:v6', '2001:db8::1')` |
| **数字** | `number:integer` | 整数 | `rx.test('number:integer', '123')` |
| | `number:decimal` | 小数 | `rx.test('number:decimal', '123.45')` |
| **日期** | `date:YYYY-MM-DD` | 标准日期 | `rx.test('date:YYYY-MM-DD', '2024-01-01')` |
| **密码** | `password:medium` | 中等强度密码 | `rx.test('password:medium', 'Password123')` |
| | `password:strong` | 强密码 | `rx.test('password:strong', 'Password123!')` |

> **[内置正则大全](https://github.com/SailingCoder/regex-kit/blob/main/docs/REGEX_REFERENCE.md)** - 查看完整的100+种内置正则详细说明

### 2. 分组语法，统一管理
```javascript
// 一个类型，多种格式 - 这是 Regex Kit 的独创设计

// 密码强度分组
rx.test('password:weak', '123456');         // 弱密码：纯数字
rx.test('password:medium', 'Password123');   // 中等密码：字母+数字
rx.test('password:strong', 'Password123!'); // 强密码：字母+数字+符号

// 邮箱严格程度分组
rx.test('email:basic', 'test@gmail.com');   // 基础格式：宽松验证
rx.test('email:strict', 'user@company.com'); // 严格格式：RFC标准
rx.test('email:enterprise', 'admin@company.com'); // 企业格式：排除免费邮箱

// 数字类型分组
rx.test('number:integer', '123');           // 整数
rx.test('number:decimal', '123.45');        // 小数
rx.test('number:signed', '-123');           // 有符号数

// 查看支持的分组
rx.info('password').groups;  // ['weak', 'medium', 'strong']
```

### 3. 函数式调用（可选）
```javascript
import { get, test, info, extract, findAll, removeAll, add } from 'regex-kit';

// 无需 rx 前缀，更简洁
const emailRegex = get('email');
const phoneRegex = get('phone:CN');
test('email', 'user@example.com');
test('phone:CN', '13800138000');
const typeInfo = info('employeeId');
```

### 4. 文本处理
```javascript
const text = '联系方式：user@example.com，手机：13800138000';
rx.extract('email', text);                  // 提取第一个 → 'user@example.com'
rx.extractAll('phone:CN', text);            // 提取所有 → ['13800138000']
rx.replace('email', text, '[邮箱]');        // 替换第一个
rx.replaceAll('phone:CN', text, '[手机]');  // 替换所有
rx.count('phone:CN', text);                 // 统计数量 → 1
rx.find('phone:CN', text);                  // 查找第一个位置 → { match: '13800138000', index: 28, length: 11 }
rx.findAll('phone:CN', text);               // 查找所有位置 → [{ match: '13800138000', index: 28, length: 11 }]
rx.remove('phone:CN', text);                // 移除第一个 → '联系方式：user@example.com，手机：'
rx.removeAll('phone:CN', text);             // 移除所有 → '联系方式：user@example.com，手机：'
rx.highlight('phone:CN', text, '<mark>$&</mark>'); // 高亮显示
```

### 5. 批量操作
```javascript
import { extractBatch, replaceBatch, countBatch } from 'regex-kit/operations/batch';

const text = '联系方式：user@example.com，电话：13800138000，网站：https://example.com';

// 批量提取多种类型
const results = extractBatch(text, ['email', 'phone', 'url']);
console.log(results);
// { email: ['user@example.com'], phone: ['13800138000'], url: ['https://example.com'] }

// 批量替换
const masked = replaceBatch(text, {
  email: '[邮箱]',
  phone: '[电话]',
  url: '[网址]'
});
// '联系方式：[邮箱]，电话：[电话]，网站：[网址]'

// 批量统计
const counts = countBatch(text, ['email', 'phone', 'url']);
// { email: 1, phone: 1, url: 1 }
```

### 6. 管理和扩展
```javascript
// 查看和管理（任何地方都可以调用）
rx.info('phone');                    // 获取类型信息
rx.info('phone:CN');                 // 同样返回phone类型的完整信息
rx.list();                          // 列出所有类型
rx.add('employeeId', /^EMP\d{6}$/); // 添加自定义
```

## API 参考

### 核心方法
| 方法 | 语法 | 说明 |
|------|------|------|
| `get` | `rx.get(typeSpec)` | 获取正则对象 |
| `test` | `rx.test(typeSpec\|regex, value)` | 验证文本 |
| `info` | `rx.info(typeSpec)` | 查看类型信息（支持 `type:group` 语法，返回类型级别完整信息） |
| `add` | `rx.add(type, pattern)` | 添加自定义正则 |
| `inject` | `rx.inject(partial)` | 智能合并配置（保留内置 + 添加自定义） |
| `use` | `rx.use(registry)` | 完全替换配置（清空内置，使用全新配置） |
| `list` | `rx.list()` | 列出所有类型 |
| `config` | `rx.config(options)` | 配置系统行为 |

### 文本处理
| 方法 | 语法 | 回调支持 | 说明 |
|------|------|----------|------|
| `extract` | `rx.extract(typeSpec, text, processor?)` | ✅ | 提取第一个匹配 |
| `extractAll` | `rx.extractAll(typeSpec, text, processor?)` | ✅ | 提取所有匹配 |
| `replace` | `rx.replace(typeSpec, text, replacement)` | ✅ | 替换第一个 |
| `replaceAll` | `rx.replaceAll(typeSpec, text, replacement)` | ✅ | 替换所有 |
| `highlight` | `rx.highlight(typeSpec, text, wrapper?)` | ✅ | 高亮所有匹配项 |
| `count` | `rx.count(typeSpec, text)` | ❌ | 统计匹配数量 |
| `find` | `rx.find(typeSpec, text)` | ❌ | 查找第一个匹配位置 |
| `findAll` | `rx.findAll(typeSpec, text)` | ❌ | 查找所有匹配位置 |
| `remove` | `rx.remove(typeSpec, text)` | ❌ | 移除第一个匹配项 |
| `removeAll` | `rx.removeAll(typeSpec, text)` | ❌ | 移除所有匹配项 |

### 批量操作
| 方法 | 语法 | 说明 |
|------|------|------|
| `extractBatch` | `extractBatch(text, types)` | 批量提取多种类型 |
| `replaceBatch` | `replaceBatch(text, replacements)` | 批量替换多种类型 |
| `countBatch` | `countBatch(text, types)` | 批量统计多种类型 |

### 链式调用
支持流畅的链式操作，让复杂的文本处理更优雅：

```javascript
// 复杂的数据处理流程
const result = rx.chain('用户数据：张三，邮箱：user@example.com，电话：13800138000')
  .replaceAll('email', '[邮箱已脱敏]')           // 脱敏邮箱
  .replaceAll('phone', '[电话已脱敏]')           // 脱敏电话
  .transform(text => text.toUpperCase())        // 转大写
  .when(text => text.length > 20, chain =>     // 条件处理
    chain.transform(text => `处理完成：${text}`)
  )
  .toString();
```

### 特性说明
- **type:group语法**：所有API都支持，如 `phone:CN`、`email:enterprise`
- **正则对象**：可直接传入 `RegExp` 对象，如 `rx.test(/\d+/, text)`
- **回调函数**：支持字符串替换和函数回调两种方式
- **回调参数**：`(match, offset, string)` - 匹配文本、位置、原字符串

### 回调函数示例
```javascript
// 数据脱敏
rx.replaceAll('phone:CN', text, match => 
  match.slice(0,3) + '****' + match.slice(-4)
);

// 条件处理
rx.replaceAll('phone:CN', text, (match, offset) => 
  offset < 10 ? '[主要联系方式]' : '[备用联系方式]'
);
```

### 安全防护
内置ReDoS攻击防护，**所有添加正则的方法**都会自动检测危险正则：

```javascript
// 安全的正则 - 正常添加
rx.add('safe', /^[a-z]+$/);           // ✅ 成功
rx.inject({ safe: /^[a-z]+$/ });      // ✅ 成功  
rx.use({ safe: /^[a-z]+$/ });         // ✅ 成功

// 危险的正则 - 自动阻止
rx.add('dangerous', /^(a+)+$/);       // ❌ 抛出异常
rx.inject({ dangerous: /^(a+)+$/ });  // ❌ 抛出异常
rx.use({ dangerous: /^(a+)+$/ });     // ❌ 抛出异常
// Error: Unsafe regex pattern for type "dangerous": potential ReDoS risk

// 分组配置中的危险正则也会被检测
rx.inject({
  testType: {
    safe: /^[a-z]+$/,      // ✅ 安全
    dangerous: /^(a+)+$/   // ❌ 危险，会被阻止
  }
});

// 可配置安全级别
rx.config({ securityEnabled: false }); // 关闭保护（不推荐）
```

## 对比传统方案

**传统方式**：
```javascript
// 痛苦的正则地狱
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^1[3-9]\d{9}$/;  // 这是中国的，美国的呢？
const idCardRegex = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

function validateUser(email, phone, idCard) {
  if (!emailRegex.test(email)) return '邮箱格式错误';
  if (!phoneRegex.test(phone)) return '手机号格式错误';  
  if (!idCardRegex.test(idCard)) return '身份证格式错误';
  return '验证通过';
}
```

**Regex Kit**：
```javascript
// 简洁优雅的解决方案
import { rx } from 'regex-kit';

function validateUser(email, phone, idCard) {
  if (!rx.test('email', email)) return '邮箱格式错误';
  if (!rx.test('phone:CN', phone)) return '手机号格式错误';
  if (!rx.test('idCard:CN', idCard)) return '身份证格式错误';
  return '验证通过';
}

// 需要支持企业邮箱？一行代码搞定
if (!rx.test('email:enterprise', email)) return '请使用企业邮箱';
```

**效果对比**：
- 代码量减少 80%
- 可读性提升 10 倍  
- 维护成本降低 90%
- 支持多地区格式，零额外代码

## 实际应用场景

### 表单验证
```javascript
function validateForm(form) {
  const errors = [];
  if (!rx.test('email:enterprise', form.email)) errors.push('请使用企业邮箱');
  if (!rx.test('phone:CN', form.phone)) errors.push('手机号格式错误');
  return errors;
}

// 示例
validateForm({ email: 'user@gmail.com', phone: '13800138000' });
// → ['请使用企业邮箱']
```

### 数据脱敏
```javascript
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

// 示例
maskSensitiveData('联系我：手机 13800138000，邮箱 user@company.com');
// → '联系我：手机 138****8000，邮箱 u***@company.com'
```

### 日志解析
```javascript
function parseLog(logText) {
  return {
    ips: rx.extractAll('ip:v4', logText),
    emails: rx.extractAll('email', logText),
    phoneCount: rx.count('phone:CN', logText)
  };
}

// 示例
const log = '2024-01-01 INFO User user@test.com login from 192.168.1.100';
parseLog(log);
// → { ips: ['192.168.1.100'], emails: ['user@test.com'], phoneCount: 0 }
```

## 团队协作

### 统一正则规范
```javascript
// src/main.js - 项目入口文件统一配置
import { rx } from 'regex-kit';

// 团队统一正则标准
rx.add('companyEmail', {
  pattern: /^[a-z0-9._%+-]+@company\.com$/i,
  description: '公司邮箱：只允许 @company.com 域名',
  examples: {
    valid: ['john@company.com', 'jane.doe@company.com'],
    invalid: ['john@gmail.com', 'jane@yahoo.com']
  }
});

// 其他文件中使用统一标准
rx.test('companyEmail', 'john@company.com');  // true
```

### 环境配置
```javascript
// src/main.js - 根据环境加载不同配置
import { rx } from 'regex-kit';

// 开发环境：宽松验证
const devConfig = {
  email: /^.+@.+\..+$/,  // 简单邮箱验证
  phone: /^\d{11}$/,     // 简单手机号验证
  testUser: {            // 测试用户配置
    pattern: /^test_\w+$/,
    description: '测试用户名：test_ + 字母数字',
    examples: {
      valid: ['test_user1', 'test_admin'],
      invalid: ['user1', 'test-user']
    }
  }
};

// 生产环境：严格验证
const prodConfig = {
  email: {
    default: 'enterprise',
    basic: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    enterprise: /^[a-zA-Z0-9._%+-]+@company\.com$/
  },
  phone: /^1[3-9]\d{9}$/,
  userId: {
    pattern: /^USER-[A-F0-9]{8}$/,
    description: '用户ID：USER- + 8位十六进制',
    examples: {
      valid: ['USER-A1B2C3D4', 'USER-12345678'],
      invalid: ['user-123', 'USER-G1234567']
    }
  }
};

// 根据环境加载不同配置
rx.use(process.env.NODE_ENV === 'development' ? devConfig : prodConfig);
```

## 框架集成

### Vue 3
```javascript
import { rx } from 'regex-kit';
import { ref, computed } from 'vue';

export function useValidation() {
  const email = ref('');
  const phone = ref('');
  
  const isValidEmail = computed(() => rx.test('email:enterprise', email.value));
  const isValidPhone = computed(() => rx.test('phone:CN', phone.value));
  
  return { email, phone, isValidEmail, isValidPhone };
}
```

### React
```jsx
import { rx } from 'regex-kit';
import { useState, useMemo } from 'react';

function UserForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const validation = useMemo(() => ({
    email: rx.test('email:enterprise', email),
    phone: rx.test('phone:CN', phone)
  }), [email, phone]);
  
  return (
    <form>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={validation.email ? 'valid' : 'invalid'}
        placeholder="企业邮箱"
      />
      <input 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={validation.phone ? 'valid' : 'invalid'}
        placeholder="手机号"
      />
    </form>
  );
}
```

## 许可证

MIT License

## 相关链接

问题反馈和功能需求请提交 [Issue](https://github.com/SailingCoder/regex-kit/issues)

- [GitHub 仓库](https://github.com/SailingCoder/regex-kit)
- [NPM 包页面](https://www.npmjs.com/package/regex-kit)
- [内置正则大全 (100+)](https://github.com/SailingCoder/regex-kit/blob/main/docs/REGEX_REFERENCE.md)
# regex-kit
