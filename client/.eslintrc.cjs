module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'next/core-web-vitals',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
	rules: {
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'always'],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react'],
					['^@?\\w'],
					['@/(.*)'],
					['^~'],
					['^[./]'],
					['^~assets'],
					['@.+.(sc|sa|c)ss$'],
					['.(sc|sa|c)ss$'],
					['.module.(sc|sa|c)ss$'],
				],
			},
		],
	},
};
