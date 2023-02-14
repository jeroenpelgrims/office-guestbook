<script lang="ts">
	import QRCode from 'qrcode';
	export let url: string;

	let svg: string | undefined = undefined;
	QRCode.toString(url, { type: 'svg', margin: 2 }).then((value) => (svg = value));
</script>

{@html svg}

<style lang="scss">
	:global(svg) {
		border-radius: 10px;
	}
</style>
