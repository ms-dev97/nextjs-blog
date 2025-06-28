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

async function getPostBySlug(slug: string) {
    const post = (await db.select().from(postTable).where(eq(postTable.slug, slug)).limit(1)).at(0);
    return post;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

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
        </div>
    );
}