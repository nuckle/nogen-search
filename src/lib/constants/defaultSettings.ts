import type { Browser } from 'webextension-polyfill';
import { sites } from '~/lib/constants/sites';
import { before2023Date } from '~/lib/constants/dates';
import {
	setDateToStorage,
	setOptionValueToSyncStorage,
	setExcludedSitesToStorage,
	setOptionValueToLocalStorage,
} from '~/lib/utils/storage';
import {
	duckAiChatOptionStorage,
	duckAiAssistantOptionStorage,
	googleOverviewOptionStorage,
	disableCopilotOptionStorage,
	optionStorageDefinitions,
	googleOverviewInjectOptionStorage,
	showAdditionalOptionsOptionStorage,
} from '~/lib/constants/storageDefinitions';
import {
	removeAllChromeRules,
	addAllChromeRules,
} from '~/lib/utils/chromeRules';

export async function setSettingsToDefault(browser: Browser) {
	if (chrome?.declarativeNetRequest !== undefined) {
		await removeAllChromeRules();
		await addAllChromeRules(browser);
	}

	await Promise.all(sites.map((site) => site.setStorageStatus(browser, true)));

	const defaultValues: Record<string, boolean> = {
		[googleOverviewOptionStorage]: true,
		[duckAiChatOptionStorage]: true,
		[duckAiAssistantOptionStorage]: true,
		[disableCopilotOptionStorage]: true,
		[googleOverviewInjectOptionStorage]: true,
	};

	await Promise.all(
		optionStorageDefinitions.map((option) => {
			const value = defaultValues[option] ?? false;
			return setOptionValueToSyncStorage(option, value, browser);
		}),
	);
	await setDateToStorage(before2023Date, browser);
	await setExcludedSitesToStorage(['chatgpt.com'], browser);

	await setOptionValueToLocalStorage(
		showAdditionalOptionsOptionStorage,
		false,
		browser,
	);
}
