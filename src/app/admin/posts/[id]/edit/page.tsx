import ContentWrapper from "@/app/admin/components/ContentWrapper";
import FormSwitch from "@/app/admin/components/FormSwitch";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { getPost, updatePost } from "@/lib/post";
import { ArrowLeft } from "lucide-react";

async function getCategories() {
    const categories = await db.select({
        id: categoryTable.id,
        title: categoryTable.title
    }).from(categoryTable);

    return categories;
}

export default async function UpdatePost({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const categories = await getCategories();
    const post = await getPost(+id);

    async function updateAction(formdata: FormData) {
        'use server';
        await updatePost(formdata, +id);
    }

    return (
        <ContentWrapper>
            <a href="/admin/posts" className="inline-flex items-center gap-2 mb-8" title="Go back">
                <ArrowLeft  size={20} />
                <span className="font-semibold text-sm">Go back</span>
            </a>

            <form action={updateAction}>
                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" name="title" defaultValue={post?.title} placeholder="Title" className="mt-2" required />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input type="text" id="slug" name="slug" defaultValue={post?.slug} placeholder="slug" className="mt-2" readOnly />
                    </div>
                </div>

                <div className="mb-5">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea name="excerpt" id="excerpt" placeholder="Excerpt" className="mt-2" defaultValue={post?.excerpt || ''} />
                </div>

                <div className="mb-5 grid md:grid-cols-2 gap-5">
                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input type="file" id="image" name="image" accept="image/*" className="mt-2" />
                    </div>

                    <img src={`/images/${post?.image}`} alt="" />
                </div>

                <div className="mb-5">
                    <Label htmlFor="content" className="mb-2">Content</Label>
                    <SimpleEditor initialContent={post?.content ?? ''} />
                </div>

                <div className="mb-5 md:grid md:grid-cols-2 md:gap-5">
                    <div>
                        <Label className="mb-2" htmlFor="featured">Featured</Label>
                        <FormSwitch name="featured" id="featured" isSwitchedOn={post?.featured ?? false} />
                    </div>

                    <div>
                        <Label htmlFor="status" className="mb-2">Status</Label>
                        <Select name="status">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" defaultValue={post?.status?.toString()} />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="0">Draft</SelectItem>
                                    <SelectItem value="1">Published</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mb-10 md:grid md:grid-cols-2 md:gap-5">
                    <div>
                        <Label htmlFor="category_id" className="mb-2">Category</Label>
                        <Select name="category_id">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Category" defaultValue={post?.category_id?.toString()} />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.title}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <Button type="submit" className="cursor-pointer">Send</Button>
            </form>
        </ContentWrapper>
    );
}