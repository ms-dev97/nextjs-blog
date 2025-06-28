import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ContentWrapper from "../components/ContentWrapper";
import { getPosts } from "@/lib/post";
import { Button } from "@/components/ui/button";
import DeleteBtn from "./components/DeleteBtn";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Link from "next/link";

export default async function PostPage({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = parseInt(searchParams.page || '1');
    const { posts, totalPosts } = await getPosts(currentPage, 10);
    const totalPages = Math.ceil(totalPosts / 10);

    return (
        <ContentWrapper>
            <div className="flex mb-10 justify-between items-center">
                <h1 className="text-2xl font-bold">Posts</h1>
                <Button className="cursor-pointer">
                    <a href="/admin/posts/create">Create post</a>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {posts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <p className="text-center font-bold py-5">No posts yet!</p>
                            </TableCell>
                        </TableRow>
                    ) : (

                    
                    posts.map(post => (
                        <TableRow key={post.id}>
                            <TableCell>{post.id}</TableCell>
                            <TableCell>
                                {post.title.length < 60 ? post.title : post.title.slice(0, 60).trim() + '...'}
                            </TableCell>
                            <TableCell>
                                <img src={`/images/${post.image}`} alt="" width={70} height={70} className="object-contain" />
                            </TableCell>
                            <TableCell>
                                {post.status === 0 && 'Draft'}
                                {post.status === 1 && 'Published'}
                            </TableCell>
                            <TableCell>{post.created_at?.toDateString()}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-500 hover:text-blue-700">Edit</Link>
                                    
                                    <button className="text-red-500 hover:text-red-700 cursor-pointer" popoverTarget={`delete-post-${post.id}`}>
                                        Delete
                                    </button>
                                    <div popover="auto" id={`delete-post-${post.id}`} className="bg-transparent text-white backdrop:bg-black backdrop:opacity-70">
                                        <div className="fixed top-1/2 left-1/2 -translate-1/2 bg-white text-black px-10 py-5 rounded-md w-full max-w-lg">
                                            <p className="font-bold text-lg text-wrap">Are you sure you want to delete this post: "{post.title}"</p>
                                            <div className="flex gap-5 mt-5">
                                                <Button className="cursor-pointer" popoverTarget={`delete-post-${post.id}`} popoverTargetAction="hide">Cancle</Button>
                                                <DeleteBtn id={post.id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                    )}
                </TableBody>
            </Table>

            <Pagination>
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
        </ContentWrapper>
    );
}