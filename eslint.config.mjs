import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(
		"next/core-web-vitals",
		"next",
		"next/typescript",
		"prettier",
		"plugin:prettier/recommended",
	),
	{
		plugins: ["prettier"],
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
			"no-unused-vars": "warn",
			"no-console": "warn",
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_" },
			],
		},
	},
];

export default eslintConfig;
