module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'object-curly-spacing': [2, 'always'],
    'react/jsx-max-props-per-line': [2, {'maximum': 1}],
    'react/jsx-closing-bracket-location': [2, {'location': 'line-aligned'}],
    'react/jsx-tag-spacing': [2, {'beforeSelfClosing': 'always'}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false
    }],
    'quotes': [2, 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-newline': [2, { 'multiline': true, 'consistent': true }],
    'semi': 'off',
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/member-delimiter-style': [2, {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }]
  }
};