import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  
  // Configuration for the ESLint config file itself
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  
  // Configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.node,        // Node.js globals (includes URLSearchParams)
        ...globals.es2022,      // Modern JavaScript globals
        
        // Playwright globals
        test: 'readonly',
        expect: 'readonly',
        page: 'readonly',
        browser: 'readonly',
        context: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'playwright-report/**',
      'blob-report/**',
      'test-results/**',
      'reports/**',
      'allure-results/**',
      'downloads/**',
      'playwright/.cache/**',
      'playwright/.auth/**',
      'yarn.lock',
    ],
  },
];