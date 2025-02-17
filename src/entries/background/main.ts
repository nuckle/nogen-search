import { type SiteParams } from '~/lib/models/Site';
import browser from 'webextension-polyfill';
import { sites } from '~/lib/constants/sites';
import { chromeRules } from '~/lib/constants/chromeRules';
import { allSyncStorageDefinitions } from '~/lib/constants/storageDefinitions';
import {
	constructUrlParams,
	constructUrlQuery,
	modifyCookies,
	injectJavaScript,
	getEnabledOptions,
} from '~/lib/utils/sites';
import { chromeRuleController } from '~/lib/utils/chromeRules';
import { setSettingsToDefault } from '~/lib/constants/defaultSettings';

browser.runtime.onInstalled.addListener(async () => {
	console.log('Extension installed');

	await setSettingsToDefault(browser);

	if (chrome?.declarativeNetRequest !== undefined) {
		chromeNetworkCode();
	} else {
		firefoxNetworkCode();
	}
});

async function chromeNetworkCode() {
	chrome.storage.sync.onChanged.addListener(async function (changes) {
		try {
			const hasOptionChanged = Object.keys(changes).some((key) => {
				return allSyncStorageDefinitions.includes(key);
			});

			if (hasOptionChanged) {
				for (const chromeRule of chromeRules) {
					await chromeRuleController(chromeRule, browser);
				}
			}
		} catch (error) {
			console.error('An error during storage update', error);
		}
	});

	sites.forEach((site) => {
		const handleRequest = async (
			details: chrome.webRequest.WebRequestDetails,
		) => {
			chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
				try {
					const currentTab = tabs[0];
					if (!currentTab || !currentTab.id) return;

					const currentUrl = details.url;
					const enabledOptions = await getEnabledOptions(browser);

					// URL parameters are managed by chrome network rules
					const [queryOperators] = await Promise.all([
						constructUrlQuery(site, browser, enabledOptions),
						modifyCookies(site, browser, enabledOptions),
						injectJavaScript(site, browser, currentTab.id, enabledOptions),
					]);

					const missingQueryOperators =
						queryOperators.length > 0
							? queryOperators.some(
									(queryOperator: string) =>
										!site.textExistsInQuery(currentUrl, queryOperator),
								)
							: false;

					const isSiteEnabled = await site.getStorageStatus(browser);

					if (isSiteEnabled && missingQueryOperators) {
						let updatedUrl = currentUrl;

						if (queryOperators.length > 0) {
							const queryOperatorString = queryOperators.join(' ');
							updatedUrl = site.addTextToQueryInUrl(
								updatedUrl,
								queryOperatorString,
								queryOperators,
							);
						}

						if (updatedUrl !== currentUrl) {
							chrome.tabs.update(currentTab.id, { url: updatedUrl });
						}
					}
				} catch (error) {
					console.error('An error during tab update', error);
				}
			});
		};

		chrome.webRequest.onCompleted.addListener(handleRequest, {
			urls: site.getSiteHostsGlob(),
			types: ['main_frame'],
		});
	});
}

function firefoxNetworkCode() {
	sites.forEach((site) => {
		const handleRequest = async () => {
			browser.tabs
				.query({ active: true, currentWindow: true })
				.then(async (tabs: browser.Tabs.Tab[]) => {
					try {
						const currentTab = tabs[0];
						if (!currentTab || !currentTab.id) return;

						const isSiteEnabled = await site.getStorageStatus(browser);

						if (isSiteEnabled) {
							const enabledOptions = await getEnabledOptions(browser);

							await injectJavaScript(site, browser, currentTab.id, enabledOptions);
						}
					} catch (error) {
						console.error('An error during tab update', error);
					}
				})
				.catch((error) => {
					console.error('Failed to query tabs', error);
				});
		};

		const handleBlockingRequest = async (
			details: browser.WebRequest.OnBeforeRequestDetailsType,
		) => {
			const isSiteEnabled = await site.getStorageStatus(browser);
			const currentUrl = details.url;

			const enabledOptions = await getEnabledOptions(browser);
			const urlParams = await constructUrlParams(site, browser, enabledOptions);
			const queryOperators = await constructUrlQuery(
				site,
				browser,
				enabledOptions,
			);
			await modifyCookies(site, browser, enabledOptions);

			const missingUrlParams = urlParams.some(
				(param: SiteParams) => !site.hasParamsInUrl(currentUrl, param),
			);

			const missingqueryOperators = queryOperators.some(
				(queryOperator: string) =>
					!site.textExistsInQuery(currentUrl, queryOperator),
			);

			if (
				details.type === 'main_frame' &&
				isSiteEnabled === true &&
				(missingUrlParams || missingqueryOperators)
			) {
				let updatedUrl = currentUrl;
				for (const param of urlParams) {
					updatedUrl = site.setCustomParamsInUrl(updatedUrl, param);
				}

				const queryOperatorString = queryOperators.join(' ');
				updatedUrl = site.addTextToQueryInUrl(
					updatedUrl,
					queryOperatorString,
					queryOperators,
				);

				return { redirectUrl: updatedUrl };
			}

			return { cancel: false };
		};

		browser.webRequest.onBeforeRequest.addListener(
			handleBlockingRequest,
			{ urls: site.getSiteHostsGlob(), types: ['main_frame'] },
			['blocking'],
		);

		browser.webRequest.onCompleted.addListener(handleRequest, {
			urls: site.getSiteHostsGlob(),
			types: ['main_frame'],
		});
	});
}
