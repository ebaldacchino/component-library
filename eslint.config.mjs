import { fixupConfigRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...fixupConfigRules(
		compat.extends(
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:react-hooks/recommended",
			"plugin:storybook/recommended"
		)
	),
	{
		plugins: {
			"react-refresh": reactRefresh,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",
		},

		rules: {
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": "error",

			"array-callback-return": [
				"error",
				{
					checkForEach: true,
				},
			],

			"arrow-spacing": "error",
			"brace-style": "error",
			"func-call-spacing": "error",

			"key-spacing": [
				"error",
				{
					beforeColon: false,
				},
			],

			"no-await-in-loop": "error",
			"no-constant-binary-expression": "error",
			"no-constructor-return": "error",
			"no-duplicate-imports": "error",
			"no-self-compare": "error",
			"no-template-curly-in-string": "error",
			"no-trailing-spaces": "error",
			"no-unused-private-class-members": "error",
			"no-use-before-define": "error",
			"no-useless-rename": "error",
			"object-curly-spacing": ["error", "always"],
			"react-refresh/only-export-components": "warn",
			"require-atomic-updates": "error",
			"template-curly-spacing": "error",
			"template-tag-spacing": "error",
			"@typescript-eslint/consistent-type-imports": "error",
		},
		files: ["**/*.ts", "**/*.tsx", "**/*.js"],
		ignores: ["**/dist/**/*"],
	},
];
