module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'node_modules/@vue/cli-service/webpack.config.js'
      }
    }
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-prop-type-constructor': 0,
    'comma-dangle': 0,//末尾逗号
    'max-len': [1, 150],//最大行
    'eqeqeq': 1,
    'prefer-destructuring': ['warn', {
      'object': false,
      'array': false
    }],//只对象推荐解构
    'no-param-reassign': 0,//vuex不兼容
    'import/extensions': 0,
    'func-names': 0,
    'import/no-unresolved': 0,// ...
    'no-plusplus': 0,//没必要禁止
    'no-bitwise': 0,//没必要禁止
    'no-unused-expressions': 0,//三元表达式、逻辑或没必要禁止
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'no-lonely-if': 0,
    'consistent-return': 0,
    'no-restricted-properties': 0,
    'object-curly-newline': [
      1,
      {
        'ImportDeclaration': 'always'
      }
    ],
    'no-continue': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'import/order': 0,
    'default-case': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    wx: 'readonly',
    uni: 'readonly',
    AlipayJSBridge: 'readonly',
    ALIPAYH5STARTUPPARAMS: 'readonly',
    my: 'readonly'
  },
};
