import { createPost } from "@/lib/post";
import { ArrowLeft } from "lucide-react";
import ContentWrapper from "../../components/ContentWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormSwitch from "../../components/FormSwitch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/db";
import { categoryTable, usersTable } from "@/db/schema";

async function getCategories() {
    const categories = await db.select({
        id: categoryTable.id,
        title: categoryTable.title
    }).from(categoryTable);

    return categories;
}

async function getUsers() {
    const users = await db.select({
        id: usersTable.id,
        name: usersTable.name
    }).from(usersTable);

    return users;
}

export default async function PostCreate() {
    const categories = await getCategories();
    const users = await getUsers();

    return (
        <ContentWrapper>
            <a href="/admin/posts" className="inline-flex items-center gap-2 mb-8" title="Go back">
                <ArrowLeft  size={20} />
                <span className="font-semibold text-sm">Go back</span>
            </a>

            <form action={createPost}>
                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Title" className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input type="text" id="slug" name="slug" placeholder="slug" className="mt-2" />
                    </div>
                </div>

                <div className="mb-5">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea name="excerpt" id="excerpt" placeholder="Excerpt" className="mt-2" />
                </div>

                <div className="mb-5">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" name="image" accept="image/*" className="mt-2" />
                </div>

                <div className="mb-5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea name="content" id="content" placeholder="Content" className="mt-2" />
                </div>

                <div className="mb-5 md:grid md:grid-cols-2 md:gap-5">
                    <div>
                        <Label className="mb-2" htmlFor="featured">Featured</Label>
                        <FormSwitch name="featured" id="featured" />
                    </div>

                    <div>
                        <Label htmlFor="status" className="mb-2">Status</Label>
                        <Select name="status">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
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
                                <SelectValue placeholder="Category" />
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

                    <div>
                        <Label htmlFor="author_id" className="mb-2">Author</Label>
                        <Select name="author_id">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Author" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
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