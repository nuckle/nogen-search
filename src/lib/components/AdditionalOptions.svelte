<script lang="ts">
	import AdditionalOption from '@components/AdditionalOption.svelte';
	import {
		redditOptionStorage,
		googleOverviewOptionStorage,
		duckAiChatOptionStorage,
		duckAiAssistantOptionStorage,
		excludeSitesFromSearchOptionStorage,
		disableCopilotOptionStorage,
		googleOverviewInjectOptionStorage
	} from '~/lib/constants/storageDefinitions';
	export let showAdditionalOptions = false;
</script>

{#if showAdditionalOptions}
	<div class="accordion-content">
		<AdditionalOption
			name={'Remove Google Overview (redirect to web)'}
			storageId={googleOverviewOptionStorage}
		/>
		<AdditionalOption
			name={'Remove Google Overview (from page code)'}
			storageId={googleOverviewInjectOptionStorage}
		/>
		<AdditionalOption
			name={'Disable Duck.ai Chat'}
			storageId={duckAiChatOptionStorage}
		/>
		<AdditionalOption
			name={'Disable DuckDuckGo Assist'}
			storageId={duckAiAssistantOptionStorage}
		/>
		<AdditionalOption
			name={'Only Results from Reddit'}
			storageId={redditOptionStorage}
		/>
		<AdditionalOption
			name={'Exclude websites from search query'}
			storageId={excludeSitesFromSearchOptionStorage}
		/>
		<AdditionalOption
			name={'Disable Bing copilot'}
			storageId={disableCopilotOptionStorage}
		/>
	</div>
{/if}

<style>
	.accordion-content {
		overflow: hidden;
	}
</style>
