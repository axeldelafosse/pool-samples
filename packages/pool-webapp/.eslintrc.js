module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-warning-comments': 'warn',
    'no-console': 'warn',
    camelcase: 'off',

    'import/named': 'off'
  }
};
