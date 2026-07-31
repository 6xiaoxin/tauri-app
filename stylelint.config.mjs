/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-html/vue',
  ],
  ignoreFiles: ['dist/**', 'node_modules/**', 'src-tauri/target/**'],
  rules: {
    'selector-class-pattern': [
      '^(?:[a-z][a-zA-Z0-9]+|router-link-active)$',
      {
        message: 'Expected class selector to use lower camelCase',
      },
    ],
  },
}
