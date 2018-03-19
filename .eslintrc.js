// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    env: {
        browser: true,
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "plugins": [
        "vue",
    ],
    // add your custom rules here
    rules: {
        "indent": 0,
        // allow async-await
        'generator-star-spacing': 'off',
        "vue/html-self-closing": "off",
        "vue/html-indent": [1, 4],
        "vue/max-attributes-per-line": 0,
        "vue/attributes-order": 0,
        "vue/mustache-interpolation-spacing": 0,
        "vue/name-property-casing": 0,
        "vue/no-unused-vars": 0,
        "vue/no-confusing-v-for-v-if": 0,
        "vue/valid-v-for": 1,
        // allow debugger during development
        'no-debugger': 0,
        'no-console': 0,
        'no-unused-vars': 1,
        "space-before-function-paren": 0
    }
}