"use client";

import { createComment } from "@/lib/comments";
import { useActionState, useState } from "react";

export default function CommentBox(
    { author, date, comment, commentId, postId, userId, depth }: {
        author: string | null,
        date: Date | null,
        comment: string,
        commentId: number,
        postId: number,
        userId: number,
        depth: number
    }
) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [_, replyFormAction, isReplyActionPending] = useActionState(createComment, null);
    const [reply, setReply] = useState('');

    return (
        <article className="py-6 text-base bg-white">
            <header className="mb-2">
                <p className="text-sm text-gray-900 dark:text-white font-semibold mb-0.5">{author}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    <time dateTime={date?.toString()} title={date?.toDateString()}>{date?.toDateString()}</time>
                </p>
            </header>

            <p className="text-gray-800">{comment}</p>

            {depth < 2 && (
                <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline font-medium mt-4 cursor-pointer"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                >
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                </button>
            )}

            {/* Reply form */}
            {showReplyForm && (
                <form className="mt-4" action={replyFormAction}>
                    <input type="hidden" name="post_id" value={postId} />
                    <input type="hidden" name="user_id" value={userId} />
                    <input type="hidden" name="parent_id" value={commentId} />

                    <textarea
                        name="comment"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your reply..."
                        defaultValue={reply}
                        onChange={e => setReply(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={reply.length < 2}
                    >
                        {isReplyActionPending ? 'Sending...' : 'Submit Reply'}
                    </button>
                </form>
            )}
        </article>
    );
}