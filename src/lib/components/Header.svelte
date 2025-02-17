<script lang="ts">
	import logo from '~/assets/logo.svg';
	import pkg from '~/../package.json';

	const logoImageUrl = new URL(logo, import.meta.url).href;
</script>

<header>
	<div class="logo">
		<img src={logoImageUrl} height="50" alt="" />
	</div>
	<h1>{pkg.displayName}</h1>
</header>

<style>

	h1 {
		font-size: 2em;
	}

	header {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 10px;
		color: #6200ee;
	}
</style>
