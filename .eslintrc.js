module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'camelcase': 'off',
    'no-console': 'off',
    'vue/multi-word-component-names': 'off', 
    'vue/require-prop-types': 'off',
  },
}
