import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	console.log('post');
	const { a, b } = await request.json();
	return json(a + b);
}) satisfies RequestHandler;
