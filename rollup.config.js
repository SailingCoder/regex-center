const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const dts = require('rollup-plugin-dts').default;

const isProduction = process.env.NODE_ENV === 'production';

// 基础插件配置
const basePlugins = [
  resolve({
    preferBuiltins: true
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false,
    module: 'esnext',
    target: 'es2018'
  })
];

// 生产环境插件
const productionPlugins = [
  ...basePlugins,
  terser({
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.warn'],
      passes: 3,
      unsafe: true,
      unsafe_comps: true,
      unsafe_math: true,
      reduce_vars: true,
      collapse_vars: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      loops: true,
      properties: true,
      conditionals: true,
      comparisons: true,
      booleans: true,
      typeofs: true,
      inline: true
    },
    mangle: {
      keep_fnames: true
    },
    format: {
      comments: false
    }
  })
];

const config = [
  // ES Module 构建
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/index.js',
      format: 'es',
      sourcemap: false
    },
    plugins: isProduction ? productionPlugins : basePlugins,
    external: [] // 没有外部依赖
  },
  
  // CommonJS 构建
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: false,
      exports: 'auto'
    },
    plugins: isProduction ? productionPlugins : basePlugins,
    external: []
  },
  
  
  // 批量操作模块 - ES Module
  {
    input: 'src/operations/batch.ts',
    output: {
      file: 'dist/esm/operations/batch.js',
      format: 'es',
      sourcemap: false
    },
    plugins: isProduction ? productionPlugins : basePlugins,
    external: []
  },
  
  // 批量操作模块 - CommonJS
  {
    input: 'src/operations/batch.ts',
    output: {
      file: 'dist/cjs/operations/batch.js',
      format: 'cjs',
      sourcemap: false,
      exports: 'auto'
    },
    plugins: isProduction ? productionPlugins : basePlugins,
    external: []
  },
  
  // TypeScript 类型定义
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/types/index.d.ts',
      format: 'es'
    },
    plugins: [dts()],
    external: []
  },
  
  
  // 批量操作类型定义
  {
    input: 'src/operations/batch.ts',
    output: {
      file: 'dist/types/operations/batch.d.ts',
      format: 'es'
    },
    plugins: [dts()],
    external: []
  }
];

module.exports = config;
