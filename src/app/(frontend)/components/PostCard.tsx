import Image from "next/image";
import Link from "next/link";

export default function PostCard({ slug, image, title, excerpt }: { slug: string, image: string | null, title: string, excerpt: string | null }) {
    return (
        <div key={slug} className="rounded-xl overflow-clip shadow-md flex flex-col border border-gray-200">
            <div className="h-80 relative">
                <Image
                    src={'/images/' + image}
                    // width="500" height="500"
                    fill
                    alt={title}
                    className="object-contain h-full w-full after:h-full after:w-full after:block after:bg-gray-100 after:absolute after:inset-0"
                />
            </div>
            <div className="p-3">
                <h3 className="text-lg font-bold mb-2.5">
                    <Link href={`/posts/${slug}`}>
                        {title}
                    </Link>
                </h3>
                <p className="mb-3">
                    {excerpt}
                </p>
                <Link className="underline text-sm cursor-pointer mt-auto" href={`/posts/${slug}`}>Read more</Link>
            </div>
        </div>
    );
}