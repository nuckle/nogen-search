<script lang="ts">
	import { onMount } from 'svelte';

	export let id;
	export let name;
	let checked = false;

	const loadStoredValue = async () => {
		chrome.storage.sync.get(id, (result) => {
			checked = result[id];
		});
	};

	onMount(() => {
		loadStoredValue();
	});

	const handleChange = (event: Event) => {
		chrome.storage.sync.set({ [id]: checked });
	};
</script>

<div class="search-engine">
	<label for={id}>{name}</label>
	<label class="toggle">
		<input type="checkbox" {id} bind:checked on:change={handleChange} />
		<span class="slider"></span>
	</label>
</div>

<style>
	.search-engine {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		align-items: center;
	}

	.search-engine label {
		font-weight: 500;
		text-transform: capitalize;
		font-size: 1rem;
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

	@media screen and (min-width: 48rem) {
		.search-engine {
			padding: 0.75rem 0;
			border-bottom: 1px solid #e5e5e5;
		}

		.search-engine label {
			font-size: 1.2em;
		}

		.search-engine:last-child {
			border-bottom: none;
		}
	}
</style>
