// The formatting rules of survey-library's .eslintrc.js, plus its override for the perf code: Node scripts that print,
// and TypeScript that Node runs directly, where a type-only import written as a value import fails at link time.
module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "warnOnUnsupportedTypeScriptVersion": false
  },
  "env": {
    "node": true,
    "es2022": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["node_modules/", "results/"],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "semi": ["error", "always"],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "space-before-blocks": "error",
    "space-infix-ops": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "no-multi-spaces": "error",
    "block-spacing": "error",
    "key-spacing": "error",
    "keyword-spacing": ["error", {
      "overrides": {
        "this": { "after": false, "before": false },
        "while": { "after": false },
        "switch": { "after": false },
        "new": { "before": false },
        "catch": { "after": false }
      }
    }],
    "semi-spacing": "error",
    "computed-property-spacing": "error",
    "no-whitespace-before-property": "error",
    "no-extra-semi": ["error"],
    "no-useless-escape": "off",
    "no-case-declarations": "off",
    "no-constant-condition": "off",
    "no-prototype-builtins": "off",
    "no-var": "off",
    "prefer-const": "off",
    "prefer-rest-params": "off",
    "no-extra-boolean-cast": "off",
    "prefer-spread": "off",
    "no-empty": "off",
    "no-console": "off",
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": { "delimiter": "comma", "requireLast": true },
      "singleline": { "delimiter": "comma", "requireLast": false },
      "overrides": { "interface": { "multiline": { "delimiter": "semi", "requireLast": true } } }
    }],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-inferrable-types": "off"
  }
};
