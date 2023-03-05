<script lang="ts">
	import type { Entry } from '@prisma/client';
	import dayjs from 'dayjs';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.extend(relativeTime);
	dayjs.extend(localizedFormat);

	export let entry: Pick<Entry, 'name' | 'message' | 'timestamp'>;
	const timestamp = dayjs(entry.timestamp);
	const isoTime = timestamp.toISOString();
</script>

<div class="card">
	<div class="card-content">
		<div class="media">
			<div class="media-content">
				<p class="title is-6">
					<time datetime={isoTime} title={isoTime}>
						{timestamp.format('LT')}
					</time>
					{entry.name}
				</p>
			</div>
		</div>

		{#if entry.message}
			<div class="content">
				{entry.message}
			</div>
		{/if}
	</div>
</div>
