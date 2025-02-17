import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webExtension from '@samrum/vite-plugin-web-extension';
import path from 'path';
import { getManifest } from './src/manifest.js';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			svelte(),
			webExtension({
				manifest: getManifest(Number(env.MANIFEST_VERSION)),
				additionalInputs: {
					scripts: ['src/entries/inject/overview.js'],
				},
			}),
		],
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
				'@components': path.resolve(__dirname, './src/lib/components'),
			},
		},
	};
});
