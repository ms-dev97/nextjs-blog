"use server";

import { db } from "@/db";
import { commentTable, usersTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export type CommentWithReplies = {
    id: number;
    content: string;
    user_id: number;
    post_id: number;
    parent_id: number | null;
    created_at: Date | null;
    authorName: string | null;
} & {
    replies: CommentWithReplies[];
}

export async function createComment(
    _: any, formDate: FormData
) {
    try {
        await db.insert(commentTable).values({
            content: formDate.get('comment') as string,
            post_id: Number(formDate.get('post_id')),
            user_id: Number(formDate.get('user_id')),
            parent_id: formDate.get('parent_id') ? Number(formDate.get('parent_id')) : null,
            status: true
        });

        return { seccess: true, message: 'Comment added successfully' };
    } catch (error) {
        return { seccess: false, error };
    }
}

export async function getBlogComments(postId: number) {
    // 1. Fetch only comments with status=true
    const allComments = await db
        .select({
            id: commentTable.id,
            content: commentTable.content,
            user_id: commentTable.user_id,
            post_id: commentTable.post_id,
            parent_id: commentTable.parent_id,
            created_at: commentTable.created_at,
            authorName: usersTable.name,
        })
        .from(commentTable)
        .leftJoin(usersTable, eq(commentTable.user_id, usersTable.id))
        .where(and(
            eq(commentTable.post_id, postId),
            eq(commentTable.status, true)
        ))
        .orderBy(desc(commentTable.created_at));

    // 2. Build the nested tree, only attach child if parent exists
    // type CommentWithReplies = typeof allComments[number] & { replies: CommentWithReplies[] };
    const commentMap = new Map<number, CommentWithReplies>();
    const rootComments: CommentWithReplies[] = [];

    for (const comment of allComments) {
        commentMap.set(comment.id, { ...comment, replies: [] });
    }

    for (const comment of commentMap.values()) {
        if (comment.parent_id && commentMap.has(comment.parent_id)) {
            commentMap.get(comment.parent_id)!.replies.push(comment);
        } else if (!comment.parent_id) {
            rootComments.push(comment);
        }
    }

    return rootComments;
}


