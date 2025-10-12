// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions}
 */
const config = {
	useTabs: true,
	tabWidth: 4,
	printWidth: 100,
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/index.css",
	overrides: [
		{
			files: ["*.yaml", "*.yml"],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};

export default config;
