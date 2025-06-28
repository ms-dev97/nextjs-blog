import { getPosts } from "@/lib/post"
import PostCard from "../components/PostCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default async function Posts({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const param = await searchParams;
    const currentPage = parseInt(param.page || '1');
    const postsPerPage = 10;
    const { posts, totalPosts } = await getPosts();
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-5">Posts</h1>

            {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {posts.map(post => (
                        <PostCard
                            key={post.slug}
                            slug={post.slug}
                            title={post.title}
                            excerpt={post.excerpt}
                            image={post.image}
                        />
                    ))}
                </div>
            ) : (
                <p>
                    Sorry! There is not posts yet.
                </p>
            )}

            {totalPosts > postsPerPage && (
                <Pagination className="mt-10">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={`?page=${currentPage - 1 || 1}`}
                                aria-disabled={currentPage === 1}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href={`?page=${i + 1}`}
                                    isActive={currentPage === i + 1}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href={`?page=${currentPage + 1 > totalPages ? totalPages : currentPage + 1}`}
                                aria-disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}