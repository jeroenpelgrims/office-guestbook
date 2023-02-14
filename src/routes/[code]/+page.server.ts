import { PrismaClient } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { passwordStrength } from 'check-password-strength';
import { sha512 } from 'hash.js';
import type { Actions, PageServerLoad } from './$types';

function fixCode(code: string) {
	return code.replaceAll('-', ' ');
}

export const load = (async ({ params }) => {
	const prisma = new PrismaClient();
	const code = fixCode(params.code);
	const guestbook = await prisma.guestbook.findFirst({ where: { code } });
	await prisma.$disconnect();

	return { taken: guestbook !== null, code };
}) satisfies PageServerLoad;

export const actions = {
	claim: async ({ request, params }) => {
		const data = await request.formData();
		const password = data.get('password') as string;

		if (passwordStrength(password).id < 2) {
			return fail(400, { passwordInvalid: true });
		}

		const hashedPassword = sha512().update(password).digest('hex');
		const code = fixCode(params.code);
		const prisma = new PrismaClient();
		await prisma.guestbook.create({ data: { code, password: hashedPassword } });
		await prisma.$disconnect();
	}
} satisfies Actions;
