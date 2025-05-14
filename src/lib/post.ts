'use server';

import { db } from '@/db';
import { postTable } from '@/db/schema';
import { redirect } from 'next/navigation';
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
        throw new Error('hsldf')
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

export async function getPosts() {
    const posts = await db.select().from(postTable);

    return posts;
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
                console.error('Error writing file:', error);
                reject(new Error('Error writing file'));
            } else {
                resolve(fileName);
            }
        });
    });
}