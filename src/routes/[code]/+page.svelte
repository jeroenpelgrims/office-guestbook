<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import UrlQrCode from '$lib/UrlQrCode.svelte';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import isToday from 'dayjs/plugin/isToday';
	import isYesterday from 'dayjs/plugin/isYesterday';
	import groupBy from 'ramda/es/groupBy';
	import type { ActionData, PageData } from './$types';
	import ClaimForm from './ClaimForm.svelte';
	import LogEntry from './LogEntry.svelte';
	import LogEntryForm from './LogEntryForm.svelte';

	dayjs.extend(isToday);
	dayjs.extend(isYesterday);
	dayjs.extend(advancedFormat);

	export let data: PageData;
	export let form: ActionData;

	$: entriesByDay = groupBy((entry) => dayjs(entry.timestamp).format('YYYY-MM-DD'), data.entries);
</script>

<section class="hero is-link">
	<div class="hero-body">
		<div class="title is-1 has-text-centered">
			<a href="/">Office guestbook</a>
		</div>

		<div class="columns is-vcentered">
			<div class="column is-three-quarters">
				<p class="title">
					{data.code}
				</p>
				<p class="subtitle">
					This is the unique code of this guestbook.<br />
					Desk visitors can also scan the QR code to open the guestbook.
				</p>
			</div>

			<div class="column">
				<UrlQrCode url={$page.url.toString()} />
			</div>
		</div>
	</div>
</section>

{#if !data.taken}
	<ClaimForm />
{:else}
	<LogEntryForm
		afterLog={() => {
			console.log('Invalidate');
			return invalidateAll();
		}}
	/>
{/if}

<div class="section">
	<div class="title">Guestbook entries ({dayjs().format('MMMM')})</div>

	{#key entriesByDay}
		{#each Object.entries(entriesByDay) as [key, entries]}
			<div class="block">
				<div class="subtitle" title={dayjs(key).toISOString()}>
					{#if dayjs(key).isToday()}
						Today
					{:else if dayjs(key).isYesterday()}
						Yesterday
					{:else}
						{dayjs(key).format('MMMM Do')}
					{/if}
				</div>

				{#each entries as entry}
					<LogEntry {entry} />
				{/each}
			</div>
		{/each}
	{/key}
</div>
