import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import { internalIpV4 } from "internal-ip";
import svgr from "vite-plugin-svgr";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

import stylexPlugin from "@stylexjs/rollup-plugin";
import styleX from "vite-plugin-stylex";

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
	// Dev Build - tauri dev
	if ((command as string) === "serve") {
		return defineConfig({
			plugins: [
				nodePolyfills(),

				svgr(),

				stylexPlugin({
					// Required. File path for the generated CSS file.
					fileName: "./.build/stylex.css",
					// default: false
					dev: true,
					// prefix for all generated classNames
					classNamePrefix: "x",
					// Required for CSS variable support
					unstable_moduleResolution: {
						// type: 'commonJS' | 'haste'
						// default: 'commonJS'
						type: "commonJS",
						// The absolute path to the root directory of your project
						// TODO:
						rootDir: ".", // __dirname,
					},
				}),

				react(),

				wasm(),
				topLevelAwait(),
			],

			optimizeDeps: {
				exclude: ["@controlkit/ui"],
			},

			resolve: {
				alias: {
					"@src": resolve(__dirname, "./src"),
					"@store": resolve(__dirname, "./src/store"),
					"@assets": resolve(__dirname, "./src/assets"),
					"@components": resolve(__dirname, "./src/components"),
				},
			},

			// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
			//
			// 1. prevent vite from obscuring rust errors
			clearScreen: false,
			// 2. tauri expects a fixed port, fail if that port is not available
			server: {
				port: 1420,
				strictPort: true,
				host: mobile ? "0.0.0.0" : false,
				hmr: mobile
					? {
							protocol: "ws",
							host: await internalIpV4(),
							port: 1421,
						}
					: undefined,
				watch: {
					// 3. tell vite to ignore watching `src-tauri`
					ignored: ["**/src-tauri/**"],
				},
			},
		});
	}

	///

	return defineConfig({
		mode: "production",

		plugins: [
			viteStaticCopy({
				targets: [
					{
						src: normalizePath(
							path.resolve(
								__dirname,
								"./node_modules/mediainfo.js/dist/MediaInfoModule.wasm",
							),
						),
						dest: "",
					},

					{
						src: normalizePath(
							path.resolve(__dirname, "./node_modules/shiki/dist/onig.wasm"),
						),
						dest: "",
					},
				],
			}),

			nodePolyfills(),

			svgr(),

			react(),

			styleX({}),

			wasm(),
			topLevelAwait(),
		],

		optimizeDeps: {
			exclude: ["@controlkit/ui"],
		},

		resolve: {
			alias: {
				"@src": resolve(__dirname, "./src"),
				"@store": resolve(__dirname, "./src/store"),
				"@assets": resolve(__dirname, "./src/assets"),
				"@components": resolve(__dirname, "./src/components"),
			},
		},
	});
});
