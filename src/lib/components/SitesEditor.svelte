<script>
	import { onMount } from 'svelte';

	export let title = '';
	export let storageName = '';
	let sites = '';
	let text = 'Save';

	onMount(() => {
		chrome.storage.sync.get(storageName, (data) => {
			sites = (data[storageName] || []).join('\n');
		});
	});

	function saveSites() {
		const siteArray = sites
			.split('\n')
			.map((site) => site.trim())
			.filter((site) => site !== '');

		chrome.storage.sync.set({ [storageName]: siteArray }, () => {
			text = 'Saved!';

			setTimeout(() => {
				text = 'Save';
			}, 1200);
		});
	}
</script>

<h3>{title}</h3>
<textarea bind:value={sites} spellcheck="false" placeholder="Enter sites here..."></textarea>
<button on:click={saveSites}>{text}</button>

<style>
	h3 {
		font-size: 1.2em;
		margin-bottom: 10px;
		text-align: left;
	}

	textarea {
		width: 100%;
		min-height: 6em;
		resize: vertical;
		padding: 10px;
		border: 1px solid #d0bfff;
		border-radius: 4px;
		background-color: #ffffff;
		color: #333333;
		font-size: 14px;
		margin-bottom: 10px;
		box-sizing: border-box;
	}

	textarea:focus {
		outline: none;
		border-color: #6200ee;
		box-shadow: 0 0 0 2px rgba(98, 0, 238, 0.2);
	}

	button {
		display: block;
		background-color: #6200ee;
		color: #ffffff;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #7c4dff;
	}

	button:active {
		background-color: #5600e8;
	}
</style>
