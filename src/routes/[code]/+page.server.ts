import { fromUrl } from '$lib/code';
import { PrismaClient } from '@prisma/client';
import { error, fail } from '@sveltejs/kit';
import BadWords from 'bad-words';
import { passwordStrength } from 'check-password-strength';
import { sha512 } from 'hash.js';
import type { Actions, PageServerLoad } from './$types';

const badWords = new BadWords();

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

		if (passwordStrength(password).id < 1) {
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
			data: { password: hashedPassword, claimed: new Date() }
		});
		await prisma.$disconnect();
	},
	addLogEntry: async ({ request, params }) => {
		const code = fromUrl(params.code);
		const data = await request.formData();
		const name = data.get('name') as string;
		const message = data.get('message') as string;

		if (!name || name.trim() === '') {
			return fail(400, { nameEmpty: true });
		}

		const prisma = new PrismaClient();
		await prisma.entry.create({
			data: {
				name,
				message: message.trim() === '' ? undefined : badWords.clean(message),
				guestbook: { connect: { code } }
			}
		});
		await prisma.$disconnect();
	}
} satisfies Actions;
