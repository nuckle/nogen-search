<script lang="ts">
	import OptionsContent from '@components/OptionsContent.svelte';
	import '@fontsource/roboto';
</script>

<main>
	<OptionsContent></OptionsContent>
</main>

<style>
	:global(body) {
		width: 100%;
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
		font-size: 0.875rem;
		padding: 1rem;
		box-sizing: border-box;
	}

	main {
		font-family:
			'Roboto',
			system-ui,
			-apple-system,
			Segoe UI,
			Helvetica Neue,
			Arial,
			Helvetica,
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: left;
		color: #2c3e50;
	}

	@media screen and (min-width: 40rem) {
		:global(body) {
			max-width: 640px;
		}
	}

	@media screen and (min-width: 48rem) {
		:global(body) {
			padding: 1.6rem;
		}
	}

	@media screen and (min-width: 64rem) {
		:global(body) {
			max-width: 1024px;
		}
	}

	@media screen and (min-width: 80rem) {
		:global(body) {
			max-width: 1280px;
		}
	}

	@media screen and (min-width: 96rem) {
		:global(body) {
			max-width: 1536px;
		}
	}
</style>
