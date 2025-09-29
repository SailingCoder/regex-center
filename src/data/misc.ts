/**
 * 杂项正则表达式集合
 * 
 * **总览**：本文件包含各种通用工具和杂项验证相关的10大类正则表达式
 * 
 * **包含类型**：
 * ├── emoji: 表情符号验证（Unicode标准表情）
 * ├── chineseChar: 中文字符验证（standard/withPunctuation两种严格程度）
 * ├── japaneseChar: 日文字符验证（平假名、片假名、汉字）
 * ├── koreanChar: 韩文字符验证（韩语字母）
 * ├── arabicChar: 阿拉伯文字符验证（阿拉伯字母）
 * ├── russianChar: 俄文字符验证（西里尔字母）
 * ├── hexColor: 十六进制颜色验证（不含#号格式）
 * ├── lottery: 彩票号码验证（双色球/大乐透）
 * ├── measurement: 测量单位验证（metric/imperial公制英制）
 * └── temperature: 温度格式验证（摄氏度/华氏度/开尔文）
 * 
 * **质量保证**：
 * • 所有正则都经过严格测试，确保准确性和兼容性
 * • 每个正则都包含详细的 valid/invalid 示例
 * • 支持多语言字符集，满足国际化需求
 * • 遵循Unicode标准和国际惯例
 * 
 * **使用方式**：
 * • 默认使用：rx.test('😀', 'emoji')
 * • 指定分组：rx.test('中文，测试！', 'chineseChar:withPunctuation')
 * • 获取正则：const regex = rx.get('temperature:celsius')
 */

import { RegexCollection } from './types';

const misc: RegexCollection = {
  emoji: {
    default: 'unicode',
    groups: {
      unicode: {
        pattern: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2B50}-\u{2B55}]/u,
        description: 'Unicode表情符号',
        examples: {
          valid: ['😀', '🎉', '🚀', '🇨🇳', '⭐', '✅'],
          invalid: ['abc', '123', ':)', '(emoji)']
        }
      }
    }
  },

  chineseChar: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[\u4e00-\u9fa5]+$/,
        description: '标准中文字符（仅汉字）',
        examples: {
          valid: ['中文', '汉字', '测试', '你好世界', '北京大学'],
          invalid: ['Chinese', '中文123', 'test中文', '中文abc', '你好world']
        }
      },
      withPunctuation: {
        pattern: /^[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]+$/,
        description: '中文字符（含标点符号）',
        examples: {
          valid: ['中文，测试！', '你好：世界', '测试（括号）'],
          invalid: ['Chinese', '中文123', 'test中文']
        }
      }
    }
  },

  japaneseChar: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+$/,
        description: '日文字符（平假名、片假名、汉字）',
        examples: {
          valid: ['ひらがな', 'カタカナ', '漢字'],
          invalid: ['English', 'ひらがな123', 'testひらがな']
        }
      }
    }
  },

  koreanChar: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]+$/,
        description: '韩文字符（韩语字母）',
        examples: {
          valid: ['한글', '테스트', '안녕하세요'],
          invalid: ['English', '한글123', 'test한글']
        }
      }
    }
  },

  arabicChar: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]+$/,
        description: '阿拉伯文字符',
        examples: {
          valid: ['العربية', 'اختبار', 'مرحبا'],
          invalid: ['English', 'العربية123', 'testالعربية']
        }
      }
    }
  },

  russianChar: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[\u0400-\u04ff]+$/,
        description: '俄文字符（西里尔字母）',
        examples: {
          valid: ['Русский', 'тест', 'Привет'],
          invalid: ['English', 'Русский123', 'testРусский']
        }
      }
    }
  },

  hexColor: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[0-9A-Fa-f]{3,8}$/,
        description: '十六进制颜色值（不含#号，3-8位）',
        examples: {
          valid: ['FF0000', '00ff00', '0000FF', 'abc123', 'fff', 'FFAA0088'],
          invalid: ['GG0000', 'HHIIJJ', 'xyz123', 'FF', 'FFAA0088AA']
        }
      }
    }
  },

  lottery: {
    default: 'doubleColor',
    groups: {
      doubleColor: {
        pattern: /^(0[1-9]|[12]\d|3[0-3])\s(0[1-9]|[12]\d|3[0-3])\s(0[1-9]|[12]\d|3[0-3])\s(0[1-9]|[12]\d|3[0-3])\s(0[1-9]|[12]\d|3[0-3])\s(0[1-9]|[12]\d|3[0-3])\s(0[1-9]|1[0-6])$/,
        description: '双色球彩票号码格式',
        examples: {
          valid: ['01 02 03 04 05 06 07', '33 32 31 30 29 28 16'],
          invalid: ['00 02 03 04 05 06 07', '01 02 03 04 05 06 17']
        }
      },
      superLotto: {
        pattern: /^(0[1-9]|[12]\d|3[0-5])\s(0[1-9]|[12]\d|3[0-5])\s(0[1-9]|[12]\d|3[0-5])\s(0[1-9]|[12]\d|3[0-5])\s(0[1-9]|[12]\d|3[0-5])\s(0[1-9]|1[0-2])\s(0[1-9]|1[0-2])$/,
        description: '大乐透彩票号码格式',
        examples: {
          valid: ['01 02 03 04 05 01 02', '35 34 33 32 31 12 11'],
          invalid: ['00 02 03 04 05 01 02', '01 02 03 04 05 13 02']
        }
      }
    }
  },

  measurement: {
    default: 'metric',
    groups: {
      metric: {
        pattern: /^\d+(\.\d+)?\s?(mm|cm|m|km|g|kg|ml|l)$/i,
        description: '公制单位测量值',
        examples: {
          valid: ['10cm', '1.5m', '500g', '2.5 kg'],
          invalid: ['10', '1.5 meters', '500 grams', '2.5kg extra']
        }
      },
      imperial: {
        pattern: /^\d+(\.\d+)?\s?(in|ft|yd|oz|lb|fl oz|gal)$/i,
        description: '英制单位测量值',
        examples: {
          valid: ['10in', '1.5ft', '16oz', '2.5 lb'],
          invalid: ['10', '1.5 feet', '16 ounces', '2.5lb extra']
        }
      }
    }
  },

  temperature: {
    default: 'celsius',
    groups: {
      celsius: {
        pattern: /^-?\d+(\.\d+)?°?C$/i,
        description: '摄氏温度格式',
        examples: {
          valid: ['25C', '25°C', '-10.5°C', '0°c'],
          invalid: ['25', '25F', '25°K', '25 degrees']
        }
      },
      fahrenheit: {
        pattern: /^-?\d+(\.\d+)?°?F$/i,
        description: '华氏温度格式',
        examples: {
          valid: ['77F', '77°F', '-10.5°F', '32°f'],
          invalid: ['25', '25C', '25°K', '77 degrees']
        }
      },
      kelvin: {
        pattern: /^-?\d+(\.\d+)?°?K$/i,
        description: '开尔文温度格式',
        examples: {
          valid: ['298K', '298°K', '273.15°K', '0°k'],
          invalid: ['25', '25C', '25°F', '298 degrees']
        }
      }
    }
  }
};

export default misc;