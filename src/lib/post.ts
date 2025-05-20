'use server';

import { db } from '@/db';
import { postTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import fs from 'node:fs';

export async function createPost(formdata: FormData) {
    const title = formdata.get('title') as string;
    const slug = formdata.get('slug') as string;
    const image = formdata.get('image');
    let imgName = '';

    if (image instanceof File && image.size > 0) {
        try {
            imgName = await saveFile(image);
        } catch (error) {
            throw new Error('Error saving file');
        }
    }

    if (!title || !slug) {
        throw new Error('Required fields are missing')
    }

    await db.insert(postTable).values({
        slug,
        title,
        image: imgName,
        excerpt: formdata.get('excerpt') as string,
        content: formdata.get('content') as string,
        status: Number(formdata.get('status')),
        featured: formdata.get('featured') ? true : false,
        author_id: Number(formdata.get('author_id')) || null,
        category_id: Number(formdata.get('category_id')) || null,
    });

    redirect('/admin/posts');
}

export async function getPosts(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const posts = await db.select().from(postTable).limit(limit).offset(offset);
    const totalPosts = await db.$count(postTable);

    return { posts, totalPosts };
}

export async function getPost(id: number) {
    const post = await db.select().from(postTable).where(eq(postTable.id, id)).limit(1);
    
    if (post.length === 0) {
        return notFound();
    }
    return post.at(0);
}

export async function updatePost(formdata: FormData, id: number) {
    const post = (await db.select().from(postTable).where(eq(postTable.id, id)).limit(1)).at(0);

    if (!post) {
        return notFound();
    }

    const image = formdata.get('image');
    let imgName = post.image;
    const imgPath = `public/images/${imgName}`;

    if (image instanceof File && image.size > 0) {
        try {
            if (imgName && fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
            imgName = await saveFile(image);
        } catch (error) {
            throw new Error('Error saving file');
        }
    }

    await db.update(postTable).set({
        title: formdata.get('title') as string,
        image: imgName,
        excerpt: formdata.get('excerpt') as string,
        content: formdata.get('content') as string,
        status: Number(formdata.get('status')),
        featured: formdata.get('featured') ? true : false,
        category_id: Number(formdata.get('category_id')) || null,
    }).where(eq(postTable.id, id));

    redirect('/admin/posts');
}

export async function deletePost(id: number) {
    const post = (await db.select({image: postTable.image}).from(postTable).where(eq(postTable.id, id)).limit(1)).at(0);
    const imgPath = `public/images/${post?.image}`;

    if (post?.image && fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
    }
    await db.delete(postTable).where(eq(postTable.id, id));
    redirect('/admin/posts');
}

export async function saveFile(img: File) {
	const extension = img.name.split('.').pop();
	const fileName = `${Date.now()}.${extension}`;

    if (extension && !['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension.toLowerCase())) {
        throw new Error('Unsupported file type!');
    }

    if (!fs.existsSync('public/images')) {
        fs.mkdirSync('public/images', { recursive: true });
    }

	const stream = fs.createWriteStream(`public/images/${fileName}`);
	const bufferedImage = await img.arrayBuffer();

	return new Promise<string>((resolve, reject) => {
        stream.write(Buffer.from(bufferedImage), error => {
            if (error) {
                reject(new Error('Error writing file'));
            } else {
                resolve(fileName);
            }
        });
    });
}