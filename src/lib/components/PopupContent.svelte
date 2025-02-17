<script lang="ts">
	import { onMount } from 'svelte';

	import SearchEngine from '@components/SearchEngine.svelte';
	import DateOptions from '@components/DateOptions.svelte';
	import AdditionalOptions from '@components/AdditionalOptions.svelte';
	import SettingsLink from '@components/SettingsLink.svelte';
	import Header from '@components/Header.svelte';
	import { sites } from '~/lib/constants/sites';
	import { showAdditionalOptionsOptionStorage } from '~/lib/constants/storageDefinitions';
	import pkg from '~/../package.json';

	let showAdditionalOptions = false;

	onMount(() => {
		chrome.storage.local.get(showAdditionalOptionsOptionStorage, (data) => {
			if (data.showAdditionalOptions !== undefined) {
				showAdditionalOptions = data.showAdditionalOptions;
			}
		});
	});

	function toggleAdditionalOptions() {
		showAdditionalOptions = !showAdditionalOptions;
		chrome.storage.local.set({
			[showAdditionalOptionsOptionStorage]: showAdditionalOptions,
		});
	}
</script>

<svelte:head>
	<title>{pkg.displayName} Popup</title>
</svelte:head>

<Header />

<section>
	<h2>Search Engines</h2>
	{#each sites as site}
		<SearchEngine id={site.id} name={site.name} />
	{/each}
</section>

<section class="date-section">
	<h2>Date Options</h2>
	<DateOptions />
</section>

<section>
	<SettingsLink />
	<button
		class="accordion heading-button"
		on:click={toggleAdditionalOptions}
		aria-expanded={showAdditionalOptions}
	>
		Additional Options
		<i class="arrow-icon" class:rotated={showAdditionalOptions}></i>
	</button>
	<AdditionalOptions {showAdditionalOptions} />
</section>

<style>
	section {
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
		min-width: 20rem;
		max-width: 32rem;
	}

	section:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}

	.arrow-icon {
		display: block;
		background: url('/src/assets/arrow.svg') no-repeat center center;
		background-size: 28px 28px;
		height: 24px;
		width: 24px;
		transition: transform 0.2s ease-in-out;
	}

	.rotated {
		transform: rotate(180deg);
	}

	h2 {
		color: #333;
		margin-bottom: 15px;
		font-weight: 600;
		font-size: 1.3rem;
	}

	.heading-button {
		display: flex;
		align-items: center;
		color: #333;
		margin: 1rem 0;
		font-weight: 600;
		font-size: 1.3rem;
		background: none;
		border: none;
		text-align: left;
		width: fit-content;
		cursor: pointer;
		transition: 0.4s;
	}

	.date-section {
		position: relative;
	}
</style>
