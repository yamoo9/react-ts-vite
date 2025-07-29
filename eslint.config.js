import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config([
  globalIgnores(['dist']),
  prettier,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // tseslint.configs.recommended,
      // tseslint.configs.recommended를 제거하고 아래로 대체하세요.
      ...tseslint.configs.recommendedTypeChecked,
      // 더 엄격한 규칙을 원한다면 아래를 사용하세요.
      // ...tseslint.configs.strictTypeChecked,
      // React용 린트 규칙 활성화
      reactX.configs['recommended-typescript'],
      // React DOM용 린트 규칙 활성화
      reactDom.configs.recommended,
      reactHooks.configs['recommended-latest'],
      jsxA11y.flatConfigs.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // 사용자 정의 규칙
  {
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
