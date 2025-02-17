<script lang="ts">
	function handleClick() {
		chrome.runtime.openOptionsPage();
		window.close();
	}
</script>

<button on:click={handleClick} class="settings-btn">Settings</button>

<style>
	.settings-btn {
		display: block;
		width: 100%;
		padding: 8px;
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

	.settings-btn:hover {
		background-color: #7c4dff;
	}
</style>
