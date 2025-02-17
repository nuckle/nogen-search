<script lang="ts">
	import PopupContent from '@components/PopupContent.svelte';
	import '@fontsource/roboto';
</script>

<main>
	<PopupContent></PopupContent>
</main>

<style>
	:global(body) {
		font-family:
			'Roboto',
			system-ui,
			-apple-system,
			Segoe UI,
			Helvetica Neue,
			Arial,
			Helvetica,
			sans-serif;
		color: #333;
		margin: 0;
		min-width: 20rem;
		max-width: 32rem;
		font-size: 0.875rem;
	}
	main {
		background-color: #ffffff;
		padding: 20px;
	}

	@media (max-width: 400px) {
		main {
			padding: 15px;
		}
	}
</style>
