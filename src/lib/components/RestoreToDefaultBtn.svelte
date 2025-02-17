<script lang="ts">
	import type { Browser } from 'webextension-polyfill';
	import { setSettingsToDefault } from '~/lib/constants/defaultSettings';

	async function handleClick() {
		const isConfirmed = confirm(
			'Are you sure you want to reset the settings to default?',
		);

		if (isConfirmed) {
			try {
				await setSettingsToDefault(chrome as unknown as Browser);
				window.location.reload();
			} catch (error) {
				console.error(
					'An error occurred while setting defaults:',
					error,
				);
			}
		} else {
			console.log('Settings reset was canceled.');
		}
	}
</script>

<button on:click={handleClick} class="defaults-btn">Restore Defaults</button>

<style>
	.defaults-btn {
		display: block;
		width: fit-content;
		padding: 8px 14px;
		font-size: 0.875rem;
		background-color: #6200ee;
		box-sizing: border-box;
		border: none;
		border-radius: 4px;
		text-decoration: none;
		color: #ffffff;
		transition: background-color 0.3s ease;
		cursor: pointer;
	}

	.defaults-btn:hover {
		background-color: #7c4dff;
	}
</style>
