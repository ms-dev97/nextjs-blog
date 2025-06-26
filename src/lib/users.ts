'use server';

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export async function createUser(formdata: FormData) {
    const name = formdata.get('name') as string;
    const email = formdata.get('email') as string;
    const password = formdata.get('password');
    const hashedPassword = await bcrypt.hash(password as string, 10);

    if (!name || !email || !password) {
        throw new Error('Required fields are missing')
    }

    await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
        is_admin: Boolean(formdata.get('is_admin'))
    });

    redirect('/admin/users');
}

export async function getUsers(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const users = await db.select().from(usersTable).limit(limit).offset(offset);
    const totalUsers = await db.$count(usersTable);

    return { users, totalUsers };
}

export async function getUser(id: number) {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    
    if (user.length === 0) {
        return notFound();
    }
    return user.at(0);
}

export async function updateUser(formdata: FormData, id: number) {
    const user = (await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1)).at(0);

    if (!user) {
        return notFound();
    }

    await db.update(usersTable).set({
        name: formdata.get('name') as string,
        email: formdata.get('email') as string,
        password: formdata.get('password') ? bcrypt.hashSync(formdata.get('password') as string, 10) : user.password,
        is_admin: Boolean(formdata.get('is_admin')),
    }).where(eq(usersTable.id, id));

    redirect('/admin/users');
}

export async function deleteUser(id: number) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    redirect('/admin/users');
}