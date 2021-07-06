
module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true
    },
    'root': true,
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': './tsconfig.json',
        'sourceType': 'module'
    },
    'extends': [
        // 'plugin:@typescript-eslint/eslint-recommended',
        // 'plugin:@typescript-eslint/recommended',
        // 'prettier',
        "plugin:@angular-eslint/recommended",
        // This is required if you use inline templates in Components
        "plugin:@angular-eslint/template/process-inline-templates"
    ],
    'plugins': [
        // '@typescript-eslint',
        // '@typescript-eslint/tslint',
        // 'unused-imports',
        // 'import'
        
    ],
    'rules': {
        '@typescript-eslint/array-type': [
            'error',
            {
                'default': 'generic'
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'enumMember',
                'format': ['strictCamelCase', 'UPPER_CASE']
            }
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'off',
            {
                'accessibility': 'explicit'
            }
        ],
        '@typescript-eslint/type-annotation-spacing': [
            'error',
            {
                before: false,
                after: true,
                overrides: { arrow: { before: true, after: true } }
            }
        ],
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                'allowSingleExtends': true
            }
        ],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single'
        ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/semi': [
            'error',
            'never'
        ],
        'arrow-parens': [
            'off',
            'always'
        ],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'constructor-super': 'error',
        'curly': [
            'error',
            'all',
        ],
        'default-case': 'error',
        'eol-last': 'error',
        'eqeqeq': [
            'error',
            'always'
        ],
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        'import/no-deprecated': 'error',
        'import/order': 'error',
        'unused-imports/no-unused-imports-ts': 'error',
        'unused-imports/no-unused-vars-ts': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
        'object-curly-spacing': ['error', 'always',{
            'arraysInObjects': false,
            'objectsInObjects': false
        }],
        'max-len': [
            'error',
            {
                'code': 150
            }
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-eval': 'error',
        'no-extra-semi': 'error',
        'no-invalid-regexp': 'error',
        'no-magic-numbers': 'off',
        'no-new-func': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-regex-spaces': 'error',
        'no-restricted-syntax': [
            'off',
            'ForInStatement'
        ],
        'no-sparse-arrays': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-useless-constructor': 'off',
        'quote-props': [
            'error',
            'as-needed'
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        'yoda': 'error'

    },
    "overrides": [
        {
          "files": ["*.ts"],
          "parserOptions": {
            "project": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "createDefaultProgram": true
          },
          "extends": [
            "plugin:@angular-eslint/recommended",
            // This is required if you use inline templates in Components
            "plugin:@angular-eslint/template/process-inline-templates"
          ],
          "rules": {
            /**
             * Any TypeScript source code (NOT TEMPLATE) related rules you wish to use/reconfigure over and above the
             * recommended set provided by the @angular-eslint project would go here.
             */
            "@angular-eslint/directive-selector": [
              "error",
              { "type": "attribute", "prefix": "app", "style": "camelCase" }
            ],
            "@angular-eslint/component-selector": [
              "error",
              { "type": "element", "prefix": "app", "style": "kebab-case" }
            ]
          }
        },
        {
          "files": ["*.html"],
          "extends": ["plugin:@angular-eslint/template/recommended"],
          "rules": {
            /**
             * Any template/HTML related rules you wish to use/reconfigure over and above the
             * recommended set provided by the @angular-eslint project would go here.
             */
          }
        }
      ]
};