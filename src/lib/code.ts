export function toUrl(code: string) {
	return code.toLowerCase().replaceAll(' ', '-');
}

export function fromUrl(code: string) {
	return code.toLowerCase().replaceAll('-', ' ');
}
