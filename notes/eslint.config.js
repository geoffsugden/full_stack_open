import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { 
      sourceType: "module", 
      globals: {
        ...globals.node,
        ...globals.browser
      }
    } 
  },
  pluginReact.configs.flat.recommended,
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.node }, 
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  },
  
]);
