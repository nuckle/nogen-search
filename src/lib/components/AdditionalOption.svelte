<script lang="ts">
	import { onMount } from 'svelte';

	export let name: string;
	export let storageId: string;
	let checked = false;

	const loadStoredValue = async () => {
		chrome.storage.sync.get(storageId, (result) => {
			checked = result[storageId];
		});
	};

	onMount(() => {
		loadStoredValue();
	});

	const handleChange = () => {
		chrome.storage.sync.set({ [storageId]: checked });
	};
</script>

<div class="toggle-row">
	<label for={storageId}>{name}</label>
	<label class="toggle">
		<input
			type="checkbox"
			id={storageId}
			bind:checked
			on:change={handleChange}
		/>
		<span class="slider"></span>
	</label>
</div>

<style>
	.toggle-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		column-gap: 0.5rem;
	}

	.toggle-row label {
		display: inline-block;
	}

	.toggle {
		position: relative;
		display: inline-block;
		width: 50px;
		height: 24px;
		flex-shrink: 0;
	}

	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 20px;
		width: 20px;
		left: 2px;
		bottom: 2px;
		background-color: #fff;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #6200ee;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}
</style>
