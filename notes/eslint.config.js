import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  pluginReact.configs.flat.recommended,
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.node },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-double'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off'
    }
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'publix/**'
    ]
  }
])
