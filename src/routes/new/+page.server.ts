import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import humanId from 'human-id';
import type { Actions } from './$types';

export const actions = {
	default: async ({}) => {
		const code = humanId({ separator: ' ' }).toLowerCase();
		const prisma = new PrismaClient();

		await prisma.guestbook.create({ data: { code } });
		await prisma.$disconnect();

		throw redirect(303, `/${code.replaceAll(' ', '-')}`);
	}
} satisfies Actions;
