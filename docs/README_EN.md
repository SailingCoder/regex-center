# Regex Kit

[简体中文](https://github.com/SailingCoder/regex-kit/blob/main/README.md) | [English](https://github.com/SailingCoder/regex-kit/blob/main/docs/README_EN.md)

**Regex Kit = Regex + Management**, A professional regex management library that makes team and project regexes manageable, maintainable, and reusable.

🎯 **Two Core Values**:
- **Ready to Use**: Built-in 100+ curated regexes covering common scenarios
- **Team Management**: Build your own regex management system and unify team standards

[![npm version](https://badge.fury.io/js/regex-kit.svg)](https://badge.fury.io/js/regex-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Why Do You Need Regex Management?

When writing regexes, have you ever encountered these pain points?

-   **Copy-Paste Hell**: Having to rewrite email, phone, ID validation in every project
-   **Cryptic Code**: `/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+...$/i` — Who can understand this?
-   **Difficult Maintenance**: Regexes scattered everywhere, changing one requires global search
-   **Team Inconsistency**: Everyone rewrites the same rules, standards are inconsistent
-   **Security Risks**: Complex regexes can easily lead to ReDoS attacks

## 🎯 Regex Kit Solution

### Installation

```bash
npm install regex-kit
```

### Solution 1: Use Built-in Regexes Directly (Ready to Use)
```javascript
// 100+ built-in curated regexes covering common scenarios
import { rx } from 'regex-kit';

// Get and validate
rx.get('email');                          // → /^[^\s@]+@[^\s@]+\.[^\s@]+$/
rx.get('phone:CN');                       // → /^1[3-9]\d{9}$/
rx.test('email', 'user@example.com');     // true - validate email with email rule
rx.test('phone:CN', '13800138000');       // true - validate phone with phone:CN rule
rx.test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'user@company.com'); // true - custom regex rule

// Group support
rx.test('password:strong', 'Password123!'); // Strong password rule
rx.test('email:enterprise', 'user@company.com'); // Enterprise email rule

// Text processing - same parameter order
const text = 'Contact: user@example.com, Phone: 13800138000';
rx.extractAll('phone:CN', text);          // Extract phone numbers with phone:CN rule
rx.replaceAll('phone:CN', text, '[Phone]'); // Replace phone numbers with phone:CN rule
rx.highlight('phone:CN', text, '<mark>$&</mark>');  // Highlight phone numbers with phone:CN rule
```

### Solution 2: Build Team Regex Management System (Recommended)
```javascript
// Completely replace built-in regexes with your team standards
rx.use({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // Only allow company email
  phone: {
    default: 'mobile',
    mobile: /^1[3-9]\d{9}$/,              // Mobile phone
    landline: /^0\d{2,3}-?\d{7,8}$/       // Landline
  },
  employeeId: {
    pattern: /^EMP\d{6}$/,
    description: 'Employee ID: EMP + 6 digits',
    examples: {
      valid: ['EMP123456', 'EMP000001'],
      invalid: ['emp123456', 'EMP12345']
    }
  }
});

// Now only your defined regexes are available, leveraging Regex Kit's management capabilities
rx.get('email') // Get email regex /^[a-z0-9._%+-]+@company\.com$/
rx.get('phone:mobile'); // Get /^1[3-9]\d{9}$/
rx.test('email', 'user@company.com');     // true
rx.test('email', 'user@gmail.com');       // false
rx.info('employeeId');                    // View rule description
```

## Core Features

- **Semantic API**: `rx.test('email', email)` - self-explanatory
- **type:group syntax**: `password:strong`, `email:enterprise` supports multiple formats
- **Centralized Management**: Add descriptions and examples, unify team standards
- **Security Protection**: Built-in ReDoS attack detection covering all add methods
- **TypeScript Friendly**: Complete type hints
- **Chaining**: Fluent text processing operation chains
- **Batch Operations**: Efficient handling of multiple types of text matching
- **Functional API**: Support prefix-free functional API
- **Callback Functions**: Flexible text processing callbacks
- **Framework Integration**: Adapters for Vue, React and other frameworks

## User Guide

### 1. Built-in 100+ Curated Regexes, Ready to Use

If you're concerned about built-in regexes having issues or not meeting project requirements, you can extend or completely replace them:

**Extension Mode (Keep Built-in + Add Custom)**:
```javascript
// Smart merge: retain built-in regexes, add/override specified types
rx.inject({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // Override built-in email
  customField: /^CF_[A-Z0-9]{8}$/,         // Add new type
  phone: {                                 // Group-level merge
    CUSTOM: /^9\d{10}$/                    // Add CUSTOM group, keep CN, US etc.
  }
});
```

**Replacement Mode (Use Management Capabilities Only, No Built-in Regexes)**:
```javascript
// Complete replacement: clear built-in, use fresh configuration
rx.use({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // Only allow company email
  phone: {                                 // Support group configuration
    default: 'mobile',
    mobile: /^1[3-9]\d{9}$/,              // Mobile phone
    landline: /^0\d{2,3}-?\d{7,8}$/       // Landline
  }
});
// Now only these types are available, leveraging Regex Kit's management capabilities
```

**Common Built-in Regexes Overview**:

| Type | Syntax | Description | Example |
|------|--------|-------------|---------|
| **Email** | `email` | Basic email format | `rx.test('email', 'user@example.com')` |
| | `email:strict` | Strict email format | `rx.test('email:strict', 'user@company.com')` |
| | `email:enterprise` | Enterprise email format | `rx.test('email:enterprise', 'admin@company.com')` |
| **Phone** | `phone:CN` | Chinese phone number | `rx.test('phone:CN', '13800138000')` |
| | `phone:US` | US phone number | `rx.test('phone:US', '+1-555-123-4567')` |
| **ID Card** | `idCard:CN` | Chinese ID card | `rx.test('idCard:CN', '110101199003077777')` |
| **Bank Card** | `bankCard:CN` | Chinese bank card | `rx.test('bankCard:CN', '6222600260001234567')` |
| **URL** | `url` | Basic URL format | `rx.test('url', 'https://example.com')` |
| **IP Address** | `ip:v4` | IPv4 address | `rx.test('ip:v4', '192.168.1.1')` |
| | `ip:v6` | IPv6 address | `rx.test('ip:v6', '2001:db8::1')` |
| **Number** | `number:integer` | Integer | `rx.test('number:integer', '123')` |
| | `number:decimal` | Decimal | `rx.test('number:decimal', '123.45')` |
| **Date** | `date:YYYY-MM-DD` | Standard date | `rx.test('date:YYYY-MM-DD', '2024-01-01')` |
| **Password** | `password:medium` | Medium strength password | `rx.test('password:medium', 'Password123')` |
| | `password:strong` | Strong password | `rx.test('password:strong', 'Password123!')` |

> **[Complete Built-in Regex Reference](https://github.com/SailingCoder/regex-kit/blob/main/docs/REGEX_REFERENCE_EN.md)** - View complete list of 100+ built-in regexes

### 2. Group Syntax for Unified Management
```javascript
// One type, multiple formats - this is Regex Kit's innovative design

// Password strength groups
rx.test('password:weak', '123456');         // Weak password: numbers only
rx.test('password:medium', 'Password123');   // Medium password: letters + numbers
rx.test('password:strong', 'Password123!'); // Strong password: letters + numbers + symbols

// Email strictness groups
rx.test('email:basic', 'test@gmail.com');   // Basic format: loose validation
rx.test('email:strict', 'user@company.com'); // Strict format: RFC standard
rx.test('email:enterprise', 'admin@company.com'); // Enterprise format: exclude free email

// Number type groups
rx.test('number:integer', '123');           // Integer
rx.test('number:decimal', '123.45');        // Decimal
rx.test('number:signed', '-123');           // Signed number

// View supported groups
rx.info('password').groups;  // ['weak', 'medium', 'strong']
```

### 3. Functional API (Optional)
```javascript
import { get, test, info, extract, findAll, removeAll, add } from 'regex-kit';

// No rx prefix needed, more concise
const emailRegex = get('email');
const phoneRegex = get('phone:CN');
test('email', 'user@example.com');
test('phone:CN', '13800138000');
const typeInfo = info('employeeId');
```

### 4. Text Processing
```javascript
const text = 'Contact: user@example.com, Phone: 13800138000';
rx.extract('email', text);                  // Extract first → 'user@example.com'
rx.extractAll('phone:CN', text);            // Extract all → ['13800138000']
rx.replace('email', text, '[Email]');        // Replace first
rx.replaceAll('phone:CN', text, '[Phone]');  // Replace all
rx.count('phone:CN', text);                 // Count → 1
rx.find('phone:CN', text);                  // Find first position → { match: '13800138000', index: 28, length: 11 }
rx.findAll('phone:CN', text);               // Find all positions → [{ match: '13800138000', index: 28, length: 11 }]
rx.remove('phone:CN', text);                // Remove first → 'Contact: user@example.com, Phone: '
rx.removeAll('phone:CN', text);             // Remove all → 'Contact: user@example.com, Phone: '
rx.highlight('phone:CN', text, '<mark>$&</mark>'); // Highlight
```

### 5. Batch Operations
```javascript
import { extractBatch, replaceBatch, countBatch } from 'regex-kit/operations/batch';

const text = 'Contact: user@example.com, Phone: 13800138000, Website: https://example.com';

// Batch extract multiple types
const results = extractBatch(text, ['email', 'phone', 'url']);
console.log(results);
// { email: ['user@example.com'], phone: ['13800138000'], url: ['https://example.com'] }

// Batch replace
const masked = replaceBatch(text, {
  email: '[Email]',
  phone: '[Phone]',
  url: '[Website]'
});
// 'Contact: [Email], Phone: [Phone], Website: [Website]'

// Batch count
const counts = countBatch(text, ['email', 'phone', 'url']);
// { email: 1, phone: 1, url: 1 }
```

### 6. Management and Extension
```javascript
// View and manage (can be called anywhere)
rx.info('phone');                    // Get type information
rx.info('phone:CN');                 // Also returns complete phone type information
rx.list();                          // List all types
rx.add('employeeId', /^EMP\d{6}$/); // Add custom
```

## API Reference

### Core Methods
| Method | Syntax | Description |
|--------|--------|-------------|
| `get` | `rx.get(typeSpec)` | Get regex object |
| `test` | `rx.test(typeSpec\|regex, value)` | Validate text |
| `info` | `rx.info(typeSpec)` | View type information (supports `type:group` syntax, returns type-level complete information) |
| `add` | `rx.add(type, pattern)` | Add custom regex |
| `inject` | `rx.inject(partial)` | Smart merge configuration (keep built-in + add custom) |
| `use` | `rx.use(registry)` | Complete replacement configuration (clear built-in, use fresh configuration) |
| `list` | `rx.list()` | List all types |
| `config` | `rx.config(options)` | Configure system behavior |

### Text Processing
| Method | Syntax | Callback Support | Description |
|--------|--------|------------------|-------------|
| `extract` | `rx.extract(typeSpec, text, processor?)` | ✅ | Extract first match |
| `extractAll` | `rx.extractAll(typeSpec, text, processor?)` | ✅ | Extract all matches |
| `replace` | `rx.replace(typeSpec, text, replacement)` | ✅ | Replace first |
| `replaceAll` | `rx.replaceAll(typeSpec, text, replacement)` | ✅ | Replace all |
| `highlight` | `rx.highlight(typeSpec, text, wrapper?)` | ✅ | Highlight all matches |
| `count` | `rx.count(typeSpec, text)` | ❌ | Count matches |
| `find` | `rx.find(typeSpec, text)` | ❌ | Find first match position |
| `findAll` | `rx.findAll(typeSpec, text)` | ❌ | Find all match positions |
| `remove` | `rx.remove(typeSpec, text)` | ❌ | Remove first match |
| `removeAll` | `rx.removeAll(typeSpec, text)` | ❌ | Remove all matches |

### Batch Operations
| Method | Syntax | Description |
|--------|--------|-------------|
| `extractBatch` | `extractBatch(text, types)` | Batch extract multiple types |
| `replaceBatch` | `replaceBatch(text, replacements)` | Batch replace multiple types |
| `countBatch` | `countBatch(text, types)` | Batch count multiple types |

### Chaining
Support fluent chaining operations for more elegant complex text processing:

```javascript
// Complex data processing flow
const result = rx.chain('User data: John, Email: user@example.com, Phone: 13800138000')
  .replaceAll('email', '[Email Masked]')           // Mask email
  .replaceAll('phone', '[Phone Masked]')           // Mask phone
  .transform(text => text.toUpperCase())        // Convert to uppercase
  .when(text => text.length > 20, chain =>     // Conditional processing
    chain.transform(text => `Processed: ${text}`)
  )
  .toString();
```

### Feature Notes
- **type:group syntax**: All APIs support, like `phone:CN`, `email:enterprise`
- **Regex objects**: Can directly pass `RegExp` objects, like `rx.test(/\d+/, text)`
- **Callback functions**: Support both string replacement and function callback modes
- **Callback parameters**: `(match, offset, string)` - match text, position, original string

### Callback Function Examples
```javascript
// Data masking
rx.replaceAll('phone:CN', text, match => 
  match.slice(0,3) + '****' + match.slice(-4)
);

// Conditional processing
rx.replaceAll('phone:CN', text, (match, offset) => 
  offset < 10 ? '[Primary Contact]' : '[Secondary Contact]'
);
```

### Security Protection
Built-in ReDoS attack protection, **all regex adding methods** automatically detect dangerous regexes:

```javascript
// Safe regex - added normally
rx.add('safe', /^[a-z]+$/);           // ✅ Success
rx.inject({ safe: /^[a-z]+$/ });      // ✅ Success  
rx.use({ safe: /^[a-z]+$/ });         // ✅ Success

// Dangerous regex - automatically blocked
rx.add('dangerous', /^(a+)+$/);       // ❌ Throws exception
rx.inject({ dangerous: /^(a+)+$/ });  // ❌ Throws exception
rx.use({ dangerous: /^(a+)+$/ });     // ❌ Throws exception
// Error: Unsafe regex pattern for type "dangerous": potential ReDoS risk

// Dangerous regexes in group configuration are also detected
rx.inject({
  testType: {
    safe: /^[a-z]+$/,      // ✅ Safe
    dangerous: /^(a+)+$/   // ❌ Dangerous, will be blocked
  }
});

// Configurable security level
rx.config({ securityEnabled: false }); // Disable protection (not recommended)
```

## Comparison with Traditional Approaches

**Traditional Way**:
```javascript
// Painful regex hell
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^1[3-9]\d{9}$/;  // This is for China, what about US?
const idCardRegex = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

function validateUser(email, phone, idCard) {
  if (!emailRegex.test(email)) return 'Invalid email format';
  if (!phoneRegex.test(phone)) return 'Invalid phone format';  
  if (!idCardRegex.test(idCard)) return 'Invalid ID card format';
  return 'Validation passed';
}
```

**Regex Kit**:
```javascript
// Clean and elegant solution
import { rx } from 'regex-kit';

function validateUser(email, phone, idCard) {
  if (!rx.test('email', email)) return 'Invalid email format';
  if (!rx.test('phone:CN', phone)) return 'Invalid phone format';
  if (!rx.test('idCard:CN', idCard)) return 'Invalid ID card format';
  return 'Validation passed';
}

// Need enterprise email support? One line of code
if (!rx.test('email:enterprise', email)) return 'Please use enterprise email';
```

**Effect Comparison**:
- 80% less code
- 10x better readability  
- 90% lower maintenance cost
- Multi-region format support with zero additional code

## Real-world Application Scenarios

### Form Validation
```javascript
function validateForm(form) {
  const errors = [];
  if (!rx.test('email:enterprise', form.email)) errors.push('Please use enterprise email');
  if (!rx.test('phone:CN', form.phone)) errors.push('Invalid phone format');
  return errors;
}

// Example
validateForm({ email: 'user@gmail.com', phone: '13800138000' });
// → ['Please use enterprise email']
```

### Data Masking
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

// Example
maskSensitiveData('Contact me: Phone 13800138000, Email user@company.com');
// → 'Contact me: Phone 138****8000, Email u***@company.com'
```

### Log Parsing
```javascript
function parseLog(logText) {
  return {
    ips: rx.extractAll('ip:v4', logText),
    emails: rx.extractAll('email', logText),
    phoneCount: rx.count('phone:CN', logText)
  };
}

// Example
const log = '2024-01-01 INFO User user@test.com login from 192.168.1.100';
parseLog(log);
// → { ips: ['192.168.1.100'], emails: ['user@test.com'], phoneCount: 0 }
```

## Team Collaboration

### Unified Regex Standards
```javascript
// src/main.js - Unified configuration in project entry file
import { rx } from 'regex-kit';

// Team unified regex standards
rx.add('companyEmail', {
  pattern: /^[a-z0-9._%+-]+@company\.com$/i,
  description: 'Company email: only allow @company.com domain',
  examples: {
    valid: ['john@company.com', 'jane.doe@company.com'],
    invalid: ['john@gmail.com', 'jane@yahoo.com']
  }
});

// Use unified standards in other files
rx.test('companyEmail', 'john@company.com');  // true
```

### Environment Configuration
```javascript
// src/main.js - Load different configurations based on environment
import { rx } from 'regex-kit';

// Development environment: loose validation
const devConfig = {
  email: /^.+@.+\..+$/,  // Simple email validation
  phone: /^\d{11}$/,     // Simple phone validation
  testUser: {            // Test user configuration
    pattern: /^test_\w+$/,
    description: 'Test username: test_ + alphanumeric',
    examples: {
      valid: ['test_user1', 'test_admin'],
      invalid: ['user1', 'test-user']
    }
  }
};

// Production environment: strict validation
const prodConfig = {
  email: {
    default: 'enterprise',
    basic: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    enterprise: /^[a-zA-Z0-9._%+-]+@company\.com$/
  },
  phone: /^1[3-9]\d{9}$/,
  userId: {
    pattern: /^USER-[A-F0-9]{8}$/,
    description: 'User ID: USER- + 8-digit hexadecimal',
    examples: {
      valid: ['USER-A1B2C3D4', 'USER-12345678'],
      invalid: ['user-123', 'USER-G1234567']
    }
  }
};

// Load different configurations based on environment
rx.use(process.env.NODE_ENV === 'development' ? devConfig : prodConfig);
```

## Framework Integration

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
        placeholder="Enterprise Email"
      />
      <input 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={validation.phone ? 'valid' : 'invalid'}
        placeholder="Phone Number"
      />
    </form>
  );
}
```

## License

MIT License

## Links

For issues and feature requests, please submit an [Issue](https://github.com/SailingCoder/regex-kit/issues)

- [GitHub Repository](https://github.com/SailingCoder/regex-kit)
- [NPM Package](https://www.npmjs.com/package/regex-kit)
- [Complete Built-in Regex Reference (100+)](https://github.com/SailingCoder/regex-kit/blob/main/docs/REGEX_REFERENCE_EN.md)
