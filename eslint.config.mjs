import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Apply these rules to all relevant files
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
      globals: globals.browser, // Add browser globals
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier, // Add Prettier plugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Base JavaScript rules
      ...tseslint.configs.recommended.rules, // TypeScript rules
      ...pluginReact.configs.flat.recommended.rules, // React rules
      "prettier/prettier": "error", // Integrate Prettier with ESLint
    },
  },
  {
    // Disable rules conflicting with Prettier
    rules: {
      ...prettierConfig.rules,
    },
  },
];
