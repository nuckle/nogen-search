<script lang="ts">
	import SearchEngine from '@components/SearchEngine.svelte';
	import DateOptions from '@components/DateOptions.svelte';
	import AdditionalOptions from '@components/AdditionalOptions.svelte';
	import SitesEditor from '@components/SitesEditor.svelte';
	import Header from '@components/Header.svelte';
	import RestoreToDefaultBtn from '@components/RestoreToDefaultBtn.svelte';
	import { sitesToExcludeFromSearch } from '~/lib/constants/storageDefinitions';
	import { sites } from '~/lib/constants/sites';
	import pkg from '~/../package.json';
</script>

<Header />

<svelte:head>
	<title>{pkg.displayName} Options</title>
</svelte:head>

<section>
	<h2>Search Engines</h2>
	{#each sites as site}
		<SearchEngine id={site.id} name={site.name} />
	{/each}
</section>

<section class="sites-editor">
	<h2>Sites editor</h2>
	<SitesEditor title={'Excluded sites'} storageName={sitesToExcludeFromSearch} />
</section>

<section class="date-section">
	<h2>Date Options</h2>
	<DateOptions />
</section>

<section>
	<h2 class="accordion">Additional Options</h2>
	<AdditionalOptions showAdditionalOptions={true} />
	<RestoreToDefaultBtn />
</section>

<style>
	section {
		border-radius: 12px;
		padding: 1rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	:global(.accordion-content) {
		margin-bottom: 0.5rem;
	}

	section:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}

	h2 {
		color: #333;
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.sites-editor h2 {
		margin-bottom: 1.25rem;
	}

	.accordion {
		transition: 0.4s;
	}

	.date-section {
		position: relative;
	}

	@media screen and (max-width: 48rem) {
		.accordion {
			cursor: pointer;
		}
	}

	@media screen and (min-width: 48rem) {
		section {
			padding: 1.5rem;
		}
	}
</style>
