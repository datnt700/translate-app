/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ["!**/.server", "!**/.client"],

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y", "@typescript-eslint", "prettier"],
      extends: [
        "plugin:react/jsx-runtime",
        "plugin:jsx-a11y/recommended",
        "eslint:recommended", // Uses the recommended rules from ESLint
        "plugin:react/recommended", // Uses the recommended rules from eslint-plugin-react
        "plugin:react-hooks/recommended", // Rules for React hooks
        "plugin:import/errors", // Helps with import/export errors
        "plugin:import/warnings",
        "plugin:import/typescript", // Ensures compatibility with TypeScript
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint
        "prettier", // Disables ESLint rules that would conflict with Prettier
        "plugin:prettier/recommended" // Integrates Prettier as an ESLint rule
      ],
      rules: {
        "prettier/prettier": "error", // Prettier as an ESLint rule, set to throw errors on failure
        "react/react-in-jsx-scope": "off", // Not required in React 17+
        "@typescript-eslint/explicit-module-boundary-types": "off", // Disable rule for return types on functions
        "import/order": ["error", { "newlines-between": "always" }] // Enforce ordering of imports
      },
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
