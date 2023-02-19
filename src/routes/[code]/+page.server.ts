import { fromUrl } from '$lib/code';
import { PrismaClient } from '@prisma/client';
import { error, fail } from '@sveltejs/kit';
import { passwordStrength } from 'check-password-strength';
import { sha512 } from 'hash.js';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const code = fromUrl(params.code);
	const prisma = new PrismaClient();
	const guestbook = await prisma.guestbook.findFirst({ where: { code } });
	await prisma.$disconnect();

	if (guestbook === null) {
		throw error(404);
	}

	return { taken: guestbook !== null && guestbook.password !== null, code };
}) satisfies PageServerLoad;

export const actions = {
	claim: async ({ request, params }) => {
		const data = await request.formData();
		const password = data.get('password') as string;

		if (passwordStrength(password).id < 2) {
			return fail(400, { passwordInvalid: true });
		}

		const hashedPassword = sha512().update(password).digest('hex');
		const code = fromUrl(params.code);
		const prisma = new PrismaClient();
		await prisma.guestbook.update({
			where: {
				password: null,
				code
			},
			data: { password: hashedPassword }
		});
		await prisma.$disconnect();
	},
	addEntry: async ({ request, params }) => {}
} satisfies Actions;
