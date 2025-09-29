/**
 * 框架适配器
 * 为不同前端框架提供便捷的集成方式
 */

import { IRegexCenter } from '../types/index';

// ============= Vue 3 适配器 =============

/**
 * Vue 3 Composition API 适配器
 */
export interface VueRegexComposable {
  /**
   * 响应式验证
   * @param value 响应式值
   * @param type 正则类型
   * @param group 分组（可选）
   */
  useValidation: (value: any, typeSpec: string) => any;
  
  
  /**
   * 表单验证器
   * @param rx RegexCenter实例
   */
  createFormValidator: (rx: IRegexCenter) => any;
}

/**
 * 创建 Vue 3 适配器
 */
export function createVueAdapter(rx: IRegexCenter): VueRegexComposable {
  return {
    useValidation: (value: any, typeSpec: string) => {
      // 这里需要用户在Vue项目中自己导入ref, computed
      // 我们只提供接口定义和使用示例
      return {
        isValid: () => rx.test(typeSpec, value),
        error: () => rx.test(typeSpec, value) ? null : `Invalid ${typeSpec}`,
      };
    },
    
    
    createFormValidator: (rxInstance: IRegexCenter) => {
      return {
        email: (value: string) => rxInstance.test('email', value) || 'Invalid email',
        phone: (value: string) => rxInstance.test('phone:CN', value) || 'Invalid phone number',
        required: (value: any) => !!value || 'This field is required',
      };
    }
  };
}

// ============= React 适配器 =============

/**
 * React Hook 类型定义
 */
export interface ReactRegexHooks {
  /**
   * 使用正则验证的Hook
   */
  useRegexValidation: (value: string, typeSpec: string) => {
    isValid: boolean;
    error: string | null;
    validate: () => boolean;
  };
  
  
  /**
   * 表单验证Hook
   */
  useFormValidation: (initialValues: Record<string, any>) => {
    values: Record<string, any>;
    errors: Record<string, string>;
    isValid: boolean;
    validate: (field?: string) => boolean;
    setFieldValue: (field: string, value: any) => void;
  };
}

/**
 * 创建 React 适配器
 */
export function createReactAdapter(rx: IRegexCenter): ReactRegexHooks {
  return {
    useRegexValidation: (value: string, typeSpec: string) => {
      // 用户需要在React项目中使用useMemo等Hook
      const isValid = rx.test(typeSpec, value);
      return {
        isValid,
        error: isValid ? null : `Invalid ${typeSpec}`,
        validate: () => rx.test(typeSpec, value),
      };
    },
    
    
    useFormValidation: (initialValues: Record<string, any>) => {
      // 提供基本的验证逻辑，用户需要结合useState等使用
      return {
        values: initialValues,
        errors: {},
        isValid: true,
        validate: (field?: string) => {
          // 验证逻辑
          return true;
        },
        setFieldValue: (field: string, value: any) => {
          // 设置字段值的逻辑
        },
      };
    }
  };
}

// ============= Angular 适配器 =============

/**
 * Angular 服务接口
 */
export interface AngularRegexService {
  /**
   * 创建验证器
   */
  createValidator: (typeSpec: string) => any;
  
  /**
   * 创建异步验证器
   */
  createAsyncValidator: (typeSpec: string) => any;
  
  /**
   * 格式化管道
   */
  createFormatPipe: () => any;
}

/**
 * 创建 Angular 适配器
 */
export function createAngularAdapter(rx: IRegexCenter): AngularRegexService {
  return {
    createValidator: (typeSpec: string) => {
      return (control: any) => {
        if (!control.value) return null;
        const isValid = rx.test(typeSpec, control.value);
        return isValid ? null : { [typeSpec]: { value: control.value } };
      };
    },
    
    createAsyncValidator: (typeSpec: string) => {
      return (control: any) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const isValid = rx.test(typeSpec, control.value);
            resolve(isValid ? null : { [typeSpec]: { value: control.value } });
          }, 100);
        });
      };
    },
    
    createFormatPipe: () => {
      return {
        transform: (value: any) => {
          return String(value);
        }
      };
    }
  };
}

// ============= 通用工具函数 =============

/**
 * 创建表单验证规则
 */
export function createValidationRules(rx: IRegexCenter) {
  return {
    email: {
      test: (value: string) => rx.test('email', value),
      message: 'Please enter a valid email address'
    },
    phone: {
      test: (value: string) => rx.test('phone:CN', value),
      message: 'Please enter a valid phone number'
    },
    password: {
      test: (value: string) => rx.test('password:strong', value),
      message: 'Password must contain at least 8 characters with letters, numbers and symbols'
    },
    idCard: {
      test: (value: string) => rx.test('idCard:CN', value),
      message: 'Please enter a valid ID card number'
    },
    url: {
      test: (value: string) => rx.test('url', value),
      message: 'Please enter a valid URL'
    }
  };
}

/**
 * 批量验证器
 */
export function createBatchValidator(rx: IRegexCenter) {
  return {
    validate: (data: Record<string, any>, rules: Record<string, string>) => {
      const errors: Record<string, string> = {};
      
      for (const [field, value] of Object.entries(data)) {
        const rule = rules[field];
        if (rule && !rx.test(rule, value)) {
          errors[field] = `Invalid ${rule}`;
        }
      }
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
  };
}

/**
 * 实时验证器（防抖）
 */
export function createDebounceValidator(rx: IRegexCenter, delay: number = 300) {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return {
    validate: (value: string, typeSpec: string, callback?: (isValid: boolean) => void) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        const isValid = rx.test(typeSpec, value);
        callback?.(isValid);
      }, delay);
    }
  };
}

// 所有函数已通过单独的export导出，无需重复导出
