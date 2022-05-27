module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['vue', 'prettier'],
  rules: {
    //规定对象属性换行时注意统一代码风格(要么都换行，要么都不换)。第二个参数是一个对象，配置是否允许在一行代码中书写多个属性。
    'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    'no-inline-comments': 0, //禁止行内备注
    'spaced-comment': 0, //注释风格,要不要有空格什么的
    'lines-around-comment': 0, //行前/行后备注
    'no-trailing-spaces': 0, //一行结束后面 空格
    'no-multi-spaces': 1, //多余 空格
    'no-mixed-spaces-and-tabs': 0, // 混用tab space
    'prefer-const': 0, //首选const
    'consistent-return': 0, //return后面是否允许省略
    'global-require': 0,
    camelcase: ['error', { properties: 'never' }], //强制驼峰法命名
    'prefer-template': 'error', //用字符串标记+操作符
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }], //使用简写语法
    'block-scoped-var': 'error', //变量在定义块的外部使用时，规则会生成警告
    'no-constant-condition': ['error', { checkLoops: false }], //if、for、white、do white不允许使用常量表达式；checkLoops设为false时，允许循环中使用常量表达式

    'no-redeclare': 'off',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // vue
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off', //关闭vue属性规则
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off', //标签每行最大属性规则关闭
    'vue/multiline-html-element-content-newline': 'off', //多行元素换行符属性规则关闭
    'vue/singleline-html-element-content-newline': 'off', //单行元素换行符属性规则关闭
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      //闭合标签
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multi-word-component-names': 'off',

    // prettier
    'prettier/prettier': 'error',
  },
}
