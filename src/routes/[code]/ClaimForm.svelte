<script lang="ts">
	import { enhance } from '$app/forms';
	import { passwordStrength } from 'check-password-strength';

	let isClaiming = false;
	let password: string = '';
	$: passwordSet = password !== '';
	$: passwordValid = passwordStrength(password);
</script>

<div class="section">
	<div class="columns is-centered">
		<div class="column is-two-thirds">
			<div class="card">
				<div class="hero is-success is-small">
					<div class="hero-body">
						<div class="title">Available</div>
						<div class="subtitle">This guestbook has not been claimed by anyone</div>
					</div>
				</div>
				<div class="card-content">
					<div class="content">Enter a password for this guestbook to claim it.</div>
					<form
						method="POST"
						action="?/claim"
						use:enhance={() => {
							isClaiming = true;
						}}
					>
						<div class="field">
							<label class="label" for="password">Password</label>
							<div class="control">
								<input
									name="password"
									class="input"
									class:is-danger={passwordSet && passwordValid.id === 0}
									class:is-warning={passwordSet && passwordValid.id === 1}
									class:is-success={passwordSet && passwordValid.id >= 2}
									type="password"
									placeholder="Type a strong password here"
									bind:value={password}
									minlength={8}
									required
								/>
								{#if passwordSet}
									<p
										class="help"
										class:is-danger={passwordValid.id === 0}
										class:is-warning={passwordValid.id === 1}
										class:is-success={passwordValid.id >= 2}
									>
										{passwordStrength(password).value}
									</p>
								{/if}
							</div>
							<div class="help">
								Your password should contain:
								<ul>
									<li>at least 6 characters</li>
									<li>at least 1 capital letter</li>
									<li>preferably some numbers</li>
									<li>preferably some special characters (!@#$ etc...)</li>
								</ul>
							</div>
						</div>

						<button
							class="button is-primary"
							disabled={passwordValid.id < 1 || isClaiming}
							class:is-loading={isClaiming}>Claim guestbook</button
						>
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
