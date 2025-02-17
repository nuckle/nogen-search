import { sites } from '~/lib/constants/sites';

export const dateOptionStorage = 'dateOption';
export const customDateOptionStorage = 'customDateOption';
export const customDateStartOptionStorage = 'startDate';
export const customDateEndOptionStorage = 'endDate';
export const redditOptionStorage = 'includeOnlyReddit';
export const googleOverviewOptionStorage = 'hideGoogleOverview';
export const googleOverviewInjectOptionStorage = 'injectGoogleOverview';
export const duckAiChatOptionStorage = 'hideDuckAiChat';
export const duckAiAssistantOptionStorage = 'hideDuckAiAssistant';
export const excludeSitesFromSearchOptionStorage = 'excludeSites';
export const disableCopilotOptionStorage = 'disableCopilot';

export const sitesToExcludeFromSearch = 'excludedSites';

export const showAdditionalOptionsOptionStorage = 'showAdditionalOptions';

export const optionStorageDefinitions: string[] = [
	redditOptionStorage,
	googleOverviewOptionStorage,
	duckAiChatOptionStorage,
	duckAiAssistantOptionStorage,
	excludeSitesFromSearchOptionStorage,
	disableCopilotOptionStorage,
	googleOverviewInjectOptionStorage,
];

export const allSyncStorageDefinitions: string[] = [
	...sites.map((site) => site.id),
	dateOptionStorage,
	customDateOptionStorage,
	customDateStartOptionStorage,
	customDateEndOptionStorage,
	redditOptionStorage,
	googleOverviewOptionStorage,
	duckAiChatOptionStorage,
	duckAiAssistantOptionStorage,
	excludeSitesFromSearchOptionStorage,
	sitesToExcludeFromSearch,
	disableCopilotOptionStorage,
	googleOverviewInjectOptionStorage,
];
