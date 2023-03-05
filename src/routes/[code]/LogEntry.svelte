<script lang="ts">
	import type { Entry } from '@prisma/client';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.extend(relativeTime);

	export let entry: Entry;
	const timestamp = dayjs(entry.timestamp);
	const isoTime = timestamp.toISOString();
	const fromNow = timestamp.fromNow();
</script>

<div class="card">
	<div class="card-content">
		<div class="media">
			<div class="media-content">
				<p class="title is-4">{entry.name}</p>
			</div>
		</div>

		<div class="content">
			{entry.message}
			<br />
			<time datetime={isoTime} title={isoTime}>{fromNow}</time>
		</div>
	</div>
</div>
