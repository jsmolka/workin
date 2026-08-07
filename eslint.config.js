import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';
import vueParser from 'vue-eslint-parser';

const rules = {
  'no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'perfectionist/sort-imports': [
    'error',
    {
      type: 'alphabetical',
      order: 'asc',
      ignoreCase: true,
      newlinesBetween: 'ignore',
      groups: ['unknown'],
      sortSideEffects: true,
    },
  ],
};

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      'unused-imports': unusedImports,
      perfectionist,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules,
  },
  {
    files: ['**/*.vue'],
    plugins: {
      'unused-imports': unusedImports,
      perfectionist,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules,
  },
  { ignores: ['node_modules/**'] },
];
