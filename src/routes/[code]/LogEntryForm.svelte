<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let name = writable<string>(browser ? window.localStorage.getItem('name') ?? '' : '');
	name.subscribe((value) => {
		if (browser) {
			localStorage.setItem('name', value);
		}
	});
</script>

<div class="section">
	<div class="columns is-centered">
		<div class="column is-two-thirds">
			<div class="card">
				<div class="hero is-info is-small">
					<div class="hero-body">
						<div class="title">Add entry</div>
						<div class="subtitle">Write a log entry in the guestbook</div>
					</div>
				</div>
				<div class="card-content">
					<form method="POST" action="?/addLogEntry" use:enhance={({ form }) => {}}>
						<div class="field">
							<label class="label" for="name">Name</label>
							<div class="control">
								<input
									name="name"
									class="input"
									type="text"
									placeholder="Type your name here"
									required
									bind:value={$name}
								/>
							</div>
						</div>

						<div class="field">
							<label class="label" for="name">Message</label>
							<div class="control">
								<textarea
									name="message"
									class="textarea"
									placeholder="Type a message if you want"
								/>
							</div>
						</div>

						<button class="button is-primary" type="submit">Save entry</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	form ul {
		list-style: disc;
		li {
			margin-left: 1.5em;
		}
	}
</style>
