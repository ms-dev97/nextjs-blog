import { db } from "@/db";
import { postTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Calendar } from "lucide-react";
import Image from "next/image";
import "@/components/tiptap-templates/simple/simple-editor.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"
import { checkIsLoggedIn, getAuthUserSession } from "@/lib/auth";
import CommentForm from "../../components/CommentForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import CommentBox from "../../components/CommentBox";
import { CommentWithReplies, getBlogComments } from "@/lib/comments";
import type { FC } from "react";

const RenderComments: FC<{ comments: CommentWithReplies[]; depth?: number, userId: number }> = ({ comments, depth = 0, userId }) => (
    <>
        {comments.map(comment => (
            <div key={comment.id} style={{ marginInline: depth * 24 }} className="not not-last:border-b border-gray-300">
                <CommentBox
                    author={comment.authorName}
                    date={comment.created_at && new Date(comment.created_at)}
                    comment={comment.content}
                    commentId={comment.id}
                    postId={comment.post_id}
                    userId={userId}
                    depth={depth}
                />
                
                {comment.replies && comment.replies.length > 0 && (
                    <>
                        {/* <hr className="my-2 border-t-gray-300" /> */}
                        <RenderComments comments={comment.replies} depth={depth + 1} userId={userId} />
                    </>
                )}
            </div>
        ))}
    </>
);

async function getPostBySlug(slug: string) {
    const post = (await db.select().from(postTable).where(eq(postTable.slug, slug)).limit(1)).at(0);
    return post;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    const isUserLoggedIn = await checkIsLoggedIn();
    const userSession = await getAuthUserSession();

    if (!post) notFound();

    const comments: CommentWithReplies[] = await getBlogComments(post.id);

    return (
        <div className="max-w-[800px] px-5 mx-auto">
            <h1 className="text-4xl font-bold mb-5 text-balance">
                {post?.title}
            </h1>

            {post?.image && (
                <div className="relative">
                    <Image
                        src={'/images/' + post.image}
                        // fill={true}
                        width={500}
                        height={500}
                        alt={post.title}
                    />
                </div>
            )}

            <time
                dateTime={post?.created_at ? new Date(post.created_at).toISOString() : undefined}
                className="flex items-center gap-1.5 mt-3 font-bold text-sm"
            >
                <Calendar size={16} /> {post?.created_at ? new Date(post.created_at).toLocaleDateString() : ""}
            </time>

            <div
                dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}
                className="mt-10 text-lg leading-relaxed tiptap ProseMirror"
            ></div>

            <hr className="my-10 border-t-gray-300" />

            {/* Comments section */}
            <section>
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussion ({comments.length})
                </h2>

                <div className="my-5">
                    {!isUserLoggedIn ? (
                        <div>
                            <Link className="underline text-blue-700 font-bold" href="/login">Login</Link> or <Link className="underline text-blue-700 font-bold" href="signup">Signup</Link> to add your comment
                        </div>
                    ) : (
                        <CommentForm
                            postId={Number(post.id)}
                            userId={userSession?.userId as number}
                        />
                    )}
                </div>

                {/* Comments */}
                {comments.length > 0 ? (
                    <RenderComments comments={comments} userId={userSession?.userId as number} />
                ) : (
                    <p className="text-gray-800">No comments yet.</p>
                )}
            </section>
        </div>
    );
}