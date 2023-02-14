<script lang="ts">
	import { browser } from '$app/environment';
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

<div class="section">
	<h1 class="title is-1 has-text-centered">Office guestbook</h1>
	<h2 class="subtitle is-4 has-text-centered">Keep track of your desk's visitors</h2>
</div>

<form action={`/${code.replaceAll(' ', '-')}`}>
	<div class="columns">
		<div class="column">
			<div class="columns">
				<div class="column">
					<button
						type="button"
						class="button is-medium"
						class:is-primary={!code}
						on:click={generateNewCode}
					>
						New guestbook
					</button>
				</div>
			</div>
		</div>

		<div class="column is-full">
			<div class="columns is-mobile">
				<div class="column is-two-thirds">
					<input class="input is-medium" type="text" placeholder="Enter a code" bind:value={code} />
				</div>
				<div class="column">
					{#if code}<button class="button is-medium is-primary">Open</button>{/if}
				</div>
			</div>
		</div>
	</div>
</form>

<section class="section">
	<h2 class="title is-2 has-text-centered">Why?</h2>
	<p class="has-text-centered">
		I was inspired by this TikTok video to make a digital version of this guestbook
	</p>
	{#if browser}
		<blockquote
			class="tiktok-embed"
			cite="https://www.tiktok.com/@holliemershon/video/7192311370644327723"
			data-video-id="7192311370644327723"
			style="max-width: 605px;min-width: 325px;"
		>
			<section>
				<a
					target="_blank"
					title="@holliemershon"
					href="https://www.tiktok.com/@holliemershon?refer=embed"
					rel="noreferrer">@holliemershon</a
				>
				Billable time documented
				<a
					title="fyp"
					target="_blank"
					href="https://www.tiktok.com/tag/fyp?refer=embed"
					rel="noreferrer">#fyp</a
				>
				<a
					target="_blank"
					title="♬ Flowers - Miley Cyrus"
					href="https://www.tiktok.com/music/Flowers-7187816271247853569?refer=embed"
					rel="noreferrer">♬ Flowers - Miley Cyrus</a
				>
			</section>
		</blockquote>
		<script async src="https://www.tiktok.com/embed.js"></script>
	{/if}
</section>

<style lang="scss">
	form {
		margin-left: 1em;
		margin-right: 1em;
	}
</style>
