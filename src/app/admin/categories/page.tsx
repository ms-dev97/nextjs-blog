import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ContentWrapper from "../components/ContentWrapper";
import { Button } from "@/components/ui/button";
import DeleteBtn from "./components/DeleteBtn";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Link from "next/link";
import { getCategories } from "@/lib/categories";

export default async function CategoryPage({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = parseInt(searchParams.page || '1');
    const { categories, totalCategories } = await getCategories(currentPage, 10);
    const totalPages = Math.ceil(totalCategories / 10);

    return (
        <ContentWrapper>
            <div className="flex mb-10 justify-between items-center">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Button className="cursor-pointer">
                    <a href="/admin/categories/create">Create category</a>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <p className="text-center font-bold py-5">No categories yet!</p>
                            </TableCell>
                        </TableRow>
                    ) : (

                    
                    categories.map(cat => (
                        <TableRow key={cat.id}>
                            <TableCell>{cat.id}</TableCell>
                            <TableCell>{cat.title}</TableCell>
                            <TableCell>
                                {cat.status && 'Active'}
                                {!cat.status && 'Inactive'}
                            </TableCell>
                            <TableCell>{cat.created_at?.toDateString()}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Link href={`/admin/categories/${cat.id}/edit`} className="text-blue-500 hover:text-blue-700">Edit</Link>
                                    
                                    <button className="text-red-500 hover:text-red-700 cursor-pointer" popoverTarget={`delete-cat-${cat.id}`}>
                                        Delete
                                    </button>
                                    <div popover="auto" id={`delete-cat-${cat.id}`} className="bg-transparent text-white backdrop:bg-black backdrop:opacity-70">
                                        <div className="fixed top-1/2 left-1/2 -translate-1/2 bg-white text-black px-10 py-5 rounded-md w-full max-w-lg">
                                            <p className="font-bold text-lg text-wrap">Are you sure you want to delete this category: "{cat.title}"?</p>
                                            <div className="flex gap-5 mt-5">
                                                <Button className="cursor-pointer" popoverTarget={`delete-cat-${cat.id}`} popoverTargetAction="hide">Cancle</Button>
                                                <DeleteBtn id={cat.id} />
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

            <Pagination className="mt-5">
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