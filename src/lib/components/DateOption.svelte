<script lang="ts">
	export let id;
	export let name;
	export let value;
	export let group;
</script>

<label>
	<input type="radio" bind:group {value} {id} />
	{name}
</label>

<style>
	label {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	input[type='radio'] {
		margin-right: 10px;
		appearance: none;
		width: 20px;
		height: 20px;
		border: 2px solid #6200ee;
		border-radius: 50%;
		outline: none;
		transition: 0.2s all linear;
	}

	input[type='radio']:checked {
		border: 6px solid #6200ee;
	}
</style>
