'use server';

import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import slugify from "slugify";

export async function createCategory(formdata: FormData) {
    const title = formdata.get('title') as string;
    const slug = formdata.get('slug') as string;

    if (!title || !slug) {
        throw new Error('Required fields are missing')
    }

    await db.insert(categoryTable).values({
        slug: slugify(slug || title, {
            lower: true,
            trim: true
        }),
        title,
        status: Boolean(formdata.get('status')),
        featured: Boolean(formdata.get('featured')),
    });

    redirect('/admin/categories');
}

export async function getCategories(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const categories = await db.select().from(categoryTable).limit(limit).offset(offset);
    const totalCategories = await db.$count(categoryTable);

    return { categories, totalCategories };
}

export async function getCategory(id: number) {
    const category = await db.select().from(categoryTable).where(eq(categoryTable.id, id)).limit(1);
    
    if (category.length === 0) {
        return notFound();
    }
    return category.at(0);
}

export async function updateCategory(formdata: FormData, id: number) {
    const category = (await db.select().from(categoryTable).where(eq(categoryTable.id, id)).limit(1)).at(0);

    if (!category) {
        return notFound();
    }

    await db.update(categoryTable).set({
        title: formdata.get('title') as string,
        status: Boolean(formdata.get('status')),
        featured: Boolean(formdata.get('featured')),
    }).where(eq(categoryTable.id, id));

    redirect('/admin/categories');
}

export async function deleteCategory(id: number) {
    await db.delete(categoryTable).where(eq(categoryTable.id, id));
    redirect('/admin/categories');
}