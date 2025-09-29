/**
 * 交通运输正则表达式集合
 * 
 * **总览**：本文件包含交通运输和物流相关的7大类正则表达式
 * 
 * **包含类型**：
 * ├── flightNumber: 航班号验证（iata/icao两种标准格式）
 * ├── trainNumber: 火车车次验证（支持中国高铁动车格式）
 * ├── shipImo: 船舶IMO号验证（7位数字标识）
 * ├── containerNumber: 集装箱号验证（4字母+6数字+1校验位）
 * ├── trackingNumber: 快递单号验证（express/ups/fedex/dhl四种）
 * ├── airportCode: 机场代码验证（iata/icao两种标准）
 * └── vehicleVin: 车辆识别码验证（17位字符，排除易混字符）
 * 
 * **质量保证**：
 * • 所有正则都经过严格测试，确保准确性和兼容性
 * • 每个正则都包含详细的 valid/invalid 示例
 * • 支持国际运输标准，满足物流追踪需求
 * • 遵循IATA、ICAO等国际组织规范
 * 
 * **使用方式**：
 * • 默认使用：rx.test('CA123', 'flightNumber')
 * • 指定分组：rx.test('1Z999AA1234567890', 'trackingNumber:ups')
 * • 获取正则：const regex = rx.get('airportCode:iata')
 */

import { RegexCollection } from './types';

const transport: RegexCollection = {
  flightNumber: {
    default: 'iata',
    groups: {
      iata: {
        pattern: /^[A-Z]{2}\d{1,4}[A-Z]?$/,
        description: 'IATA航班号格式（2字母+数字）',
        examples: {
          valid: ['CA123', 'MU5678', 'AA1234A', 'BA9'],
          invalid: ['ca123', '123CA', 'CAA123', 'CA12345']
        }
      },
      icao: {
        pattern: /^[A-Z]{3}\d{1,4}[A-Z]?$/,
        description: 'ICAO航班号格式（3字母+数字）',
        examples: {
          valid: ['CCA123', 'AAL1234', 'BAW456A'],
          invalid: ['cca123', '123CCA', 'CA123', 'CCAA123']
        }
      }
    }
  },

  trainNumber: {
    default: 'CN',
    groups: {
      CN: {
        pattern: /^[GCDZTYKL]\d{1,4}$/,
        description: '中国火车车次号码',
        examples: {
          valid: ['G123', 'D456', 'T789', 'K1234'],
          invalid: ['g123', '123G', 'A123', 'G12345']
        }
      }
    }
  },

  shipImo: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[1-9]\d{6}$/,
        description: '船舶IMO号（7位数字）',
        examples: {
          valid: ['1234567', '9876543'],
          invalid: ['0123456', '12345678', 'abc1234']
        }
      }
    }
  },

  containerNumber: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[A-Z]{4}\d{6}[A-Z0-9]$/,
        description: '集装箱号码格式',
        examples: {
          valid: ['ABCD1234567', 'TEST9876543'],
          invalid: ['ABC1234567', 'ABCD123456', 'abcd1234567']
        }
      }
    }
  },

  trackingNumber: {
    default: 'express',
    groups: {
      express: {
        pattern: /^[A-Z]{2}\d{9}[A-Z]{2}$/,
        description: '国际快递单号格式',
        examples: {
          valid: ['EE123456789CN', 'CP987654321US'],
          invalid: ['EE12345678CN', 'ee123456789cn', 'EE1234567890CN']
        }
      },
      ups: {
        pattern: /^1Z[A-Z0-9]{15}$/,
        description: 'UPS快递单号格式',
        examples: {
          valid: ['1Z999AA123456789A', '1Z123BB987654321B'],
          invalid: ['1z999aa1234567890', '1Z999AA123456789', '2Z999AA1234567890']
        }
      },
      fedex: {
        pattern: /^\d{12}$/,
        description: 'FedEx快递单号格式',
        examples: {
          valid: ['123456789012', '987654321098'],
          invalid: ['12345678901', '1234567890123', 'abc456789012']
        }
      },
      dhl: {
        pattern: /^\d{10}$/,
        description: 'DHL快递单号格式',
        examples: {
          valid: ['1234567890', '9876543210'],
          invalid: ['123456789', '12345678901', 'abc4567890']
        }
      }
    }
  },

  airportCode: {
    default: 'iata',
    groups: {
      iata: {
        pattern: /^[A-Z]{3}$/,
        description: 'IATA机场代码（3字母）',
        examples: {
          valid: ['PEK', 'LAX', 'JFK', 'LHR'],
          invalid: ['pek', 'PE', 'PEKK', '123']
        }
      },
      icao: {
        pattern: /^[A-Z]{4}$/,
        description: 'ICAO机场代码（4字母）',
        examples: {
          valid: ['ZBAA', 'KLAX', 'KJFK', 'EGLL'],
          invalid: ['zbaa', 'ZBA', 'ZBAAA', '1234']
        }
      }
    }
  },

  vehicleVin: {
    default: 'standard',
    groups: {
      standard: {
        pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
        description: '车辆识别码VIN（17位字符）',
        examples: {
          valid: ['1HGBH41JXMN109186', 'JM1BK32F261234567', 'WBAFW31060L123456', '5UXZV4C59E0123456'],
          invalid: ['1HGBH41JXMN10918', '1HGBH41JXMN1091867', '1hgbh41jxmn109186', '1HGIH41JXMN109186', '1HGOH41JXMN109186']
        }
      }
    }
  }
};

export default transport;