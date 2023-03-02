<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="section">
	<div class="columns is-centered">
		<div class="column is-two-thirds">
			<div class="card">
				<div class="hero is-info is-small">
					<div class="hero-body">
						<div class="title">Register</div>
						<div class="subtitle">Make a log entry in the guestbook</div>
					</div>
				</div>
				<div class="card-content">
					<form method="POST" action="?/log" use:enhance={({ form }) => {}}>
						<div class="field">
							<label class="label" for="name">Name</label>
							<div class="control">
								<input
									name="name"
									class="input"
									type="text"
									placeholder="Type your name here"
									required
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

						<button class="button is-primary">Log entry</button>
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
