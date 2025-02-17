import * as dotenv from 'dotenv';
import pkg from '../package.json';
import { sites } from './lib/constants/sites';
import type { Site } from './lib/models/Site';

dotenv.config();

const getSiteHosts = (): string[] => {
	return sites.map((site: Site) => site.getSiteHostsGlob()).flat();
};

const sitesHosts = getSiteHosts();
const isFirefox = process.env?.FIREFOX_BUILD === '1' ? true : false;

const sharedManifest: Partial<chrome.runtime.ManifestBase> = {
	icons: {
		16: 'icons/16.png',
		19: 'icons/19.png',
		32: 'icons/32.png',
		38: 'icons/38.png',
		48: 'icons/48.png',
		128: 'icons/128.png',
	},
	options_ui: {
		page: 'src/entries/options/index.html',
		open_in_tab: true,
	},
	permissions: ['storage', 'cookies', 'scripting', 'tabs', 'webRequest'],
	...(isFirefox && {
		browser_specific_settings: {
			gecko: {
				id: 'addon@example.com',
				strict_min_version: '89',
			},
		},
	}),
};

const browserAction = {
	default_icon: {
		48: 'icons/48.png',
		128: 'icons/128.png',
	},
	default_popup: 'src/entries/popup/index.html',
};

const ManifestV2 = {
	...sharedManifest,
	background: {
		scripts: ['src/entries/background/script.ts'],
		persistent: true,
	},
	browser_action: browserAction,
	options_ui: {
		...sharedManifest.options_ui,
		chrome_style: false,
	},
	permissions: [
		...sharedManifest.permissions,
		'webRequestBlocking',
		...sitesHosts,
	],
};

const ManifestV3 = {
	...sharedManifest,
	action: browserAction,
	background: {
		service_worker: 'src/entries/background/serviceWorker.ts',
	},
	host_permissions: sitesHosts,
	permissions: [...sharedManifest.permissions, 'declarativeNetRequest'],
};

export function getManifest(
	manifestVersion: number,
): chrome.runtime.ManifestV2 | chrome.runtime.ManifestV3 {
	const manifest = {
		author: pkg.author,
		description: pkg.description,
		name: pkg.displayName ?? pkg.name,
		version: pkg.version,
	};

	if (manifestVersion === 2) {
		return {
			...manifest,
			...ManifestV2,
			manifest_version: manifestVersion,
		};
	}

	if (manifestVersion === 3) {
		return {
			...manifest,
			...ManifestV3,
			manifest_version: manifestVersion,
		};
	}

	throw new Error(
		`Missing manifest definition for manifestVersion ${manifestVersion}`,
	);
}
