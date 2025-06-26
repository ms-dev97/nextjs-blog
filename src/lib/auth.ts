"use server";

import { createSession } from './session';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { deleteSession } from './session';
import { headers } from 'next/headers';

export async function signup(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const hashedPassword = await bcrypt.hash(password as string, 10);
 
    const isUserExists = await db.select().from(usersTable).where(eq(usersTable.email, email as string)).limit(1);

    if (isUserExists.length > 0) {
        throw new Error('User already exists with this email');
    }

    const [user] = await db.insert(usersTable).values({
        name: name as string,
        email: email as string,
        password: hashedPassword,
    }).$returningId();

    await createSession(user.id, false);

    redirect('/')
}

export async function login(formdata: FormData) {
    const email = formdata.get('email');
    const password = formdata.get('password');

    const user = (await db.select().from(usersTable).where(eq(usersTable.email, email as string)).limit(1)).at(0);
    const isPasswordMatched = await bcrypt.compare(password as string, user?.password as string);

    if (!user || !isPasswordMatched) {
        throw new Error('Wrong login credintials');
    }

    await createSession(user.id, user.is_admin || false);

    const headersList = headers();
    const referer = (await headersList).get('referer');
    const host = (await headersList).get('host');

    let redirectTo = '/';

    if (referer && host) {
        const refererUrl = new URL(referer);
        if (refererUrl.host === host && refererUrl.pathname !== '/login') {
            redirectTo = refererUrl.pathname + refererUrl.search;
        }
    }

    redirect(redirectTo);
}

export async function logout() {
    await deleteSession();
    redirect('/');
}