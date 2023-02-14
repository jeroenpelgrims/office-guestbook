<script lang="ts">
	import humanId from 'human-id';
	let code = '';

	function generateNewCode() {
		code = humanId({ separator: ' ' }).toLowerCase();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container is-max-desktop">
	<main>
		<slot />
	</main>
</section>
