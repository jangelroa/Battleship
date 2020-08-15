module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'arrow-parens': 'off',
    'max-classes-per-file': 'off',
    'react/prefer-stateless-function': 'off',
    'react/button-has-type': 'off',
    'react/prop-types': 'off',
    'class-methods-use-this': 'off',
    'no-state-in-constructor': 'off',
  },
};
