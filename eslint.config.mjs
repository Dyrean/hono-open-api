import antfu from "@antfu/eslint-config";
import drizzle from "eslint-plugin-drizzle";

export default antfu({
	type: "app",
	typescript: true,
	formatters: true,
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
		useTabs: true,
	},
	ignores: ["**/migrations/*"],
}, {
	rules: {
		"no-console": ["warn"],
		"antfu/no-top-level-await": ["off"],
		"node/prefer-global/process": ["off"],
		"node/no-process-env": ["error"],
		"perfectionist/sort-imports": ["error", {
			internalPattern: ["@/**"],
		}],
		"unicorn/filename-case": ["error", {
			case: "kebabCase",
			ignore: ["README.md"],
		}],
	},
}, {
	files: ["**/*.ts", "**/*.tsx"],
	plugins: {
		drizzle,
	},
	rules: {
		...drizzle.configs.recommended.rules,
	},
});
