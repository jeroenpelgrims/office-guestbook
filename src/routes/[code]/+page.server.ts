import { fromUrl } from '$lib/code';
import { PrismaClient } from '@prisma/client';
import { error, fail } from '@sveltejs/kit';
import BadWords from 'bad-words';
import { passwordStrength } from 'check-password-strength';
import dayjs from 'dayjs';
import { sha512 } from 'hash.js';
import type { Actions, PageServerLoad } from './$types';

const badWords = new BadWords();

export const load = (async ({ params }) => {
	const code = fromUrl(params.code);
	const startOfMonth = dayjs().startOf('month').toDate();
	const endOfMonth = dayjs().endOf('month').toDate();
	const prisma = new PrismaClient();
	const guestbook = await prisma.guestbook.findFirst({
		where: { code },
		include: {
			entries: {
				orderBy: { timestamp: 'desc' },
				where: { timestamp: { gte: startOfMonth, lte: endOfMonth } },
				select: { name: true, message: true, timestamp: true }
			}
		}
	});
	await prisma.$disconnect();

	if (guestbook === null) {
		throw error(404);
	}

	return {
		taken: guestbook.password !== null,
		code,
		entries: guestbook.entries
	};
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
		const cleanedName = badWords.clean(name);
		const cleanedMessage = message.trim() === '' ? undefined : badWords.clean(message.trim());

		if (!name || name.trim() === '') {
			return fail(400, { nameEmpty: true });
		}

		const prisma = new PrismaClient();
		await prisma.entry.create({
			data: {
				name: cleanedName,
				message: cleanedMessage,
				guestbook: { connect: { code } }
			}
		});
		await prisma.$disconnect();
	}
} satisfies Actions;
