<script lang="ts">
	import { page } from '$app/stores';
	import UrlQrCode from '$lib/UrlQrCode.svelte';
	import type { ActionData, PageData } from './$types';
	import ClaimForm from './ClaimForm.svelte';
	import LogEntryForm from './LogEntryForm.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<section class="hero is-link">
	<div class="hero-body">
		<div class="columns is-vcentered">
			<div class="column is-three-quarters">
				<p class="title">
					{data.code}
				</p>
				<p class="subtitle">
					This is the unique code of this guestbook.<br />
					Desk visitors can also scan the QR code.
				</p>
			</div>

			<div class="column">
				<UrlQrCode url={$page.url.toString()} />
			</div>
		</div>
	</div>
</section>

{#if !data.taken}
	<ClaimForm {form} />
{:else}
	<LogEntryForm {form} />
{/if}
