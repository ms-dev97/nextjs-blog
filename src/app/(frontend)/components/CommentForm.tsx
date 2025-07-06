"use client";

import { createComment } from "@/lib/comments";
import { useActionState, useState } from "react";

export default function CommentForm({
    postId,
    userId,
}: {
    postId: number,
    userId: number,
}) {
    const [comment, setComment] = useState('');
    const [_, formAction, isPending] = useActionState(createComment, null);

    return (
        <form action={formAction}>
            <input type="hidden" name="post_id" value={postId} />
            <input type="hidden" name="user_id" value={userId} />

            <label htmlFor="comment" className="sr-only">Your comment</label>

            <textarea
                id="comment"
                className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 w-full text-sm text-gray-900 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 h-[90px]"
                placeholder="Write a comment..."
                name="comment"
                defaultValue={comment}
                onChange={e => setComment(e.target.value)}
            ></textarea>

            <button
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={comment.length < 2}
            >
                {isPending ? 'Sending...' : 'Post comment'}
            </button>
        </form>
    );
}