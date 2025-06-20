import ContentWrapper from "@/app/admin/components/ContentWrapper";
import FormSwitch from "@/app/admin/components/FormSwitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategory, updateCategory } from "@/lib/categories";
import { ArrowLeft } from "lucide-react";

export default async function UpdateCategory({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const category = await getCategory(+id);

    async function updateAction(formdata: FormData) {
        'use server';
        await updateCategory(formdata, +id);
    }

    return (
        <ContentWrapper>
            <a href="/admin/categories" className="inline-flex items-center gap-2 mb-8" title="Go back">
                <ArrowLeft  size={20} />
                <span className="font-semibold text-sm">Go back</span>
            </a>

            <form action={updateAction}>
                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" name="title" defaultValue={category?.title} placeholder="Title" className="mt-2" required />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input type="text" id="slug" name="slug" defaultValue={category?.slug} placeholder="slug" className="mt-2" readOnly />
                    </div>
                </div>

                <div className="mb-5 md:grid md:grid-cols-2 md:gap-5">
                    <div>
                        <Label className="mb-2" htmlFor="featured">Status</Label>
                        <FormSwitch name="status" id="status" isSwitchedOn={category?.status ?? false} />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="featured">Featured</Label>
                        <FormSwitch name="featured" id="featured" isSwitchedOn={category?.featured ?? false} />
                    </div>
                </div>
                
                <Button type="submit" className="cursor-pointer">Send</Button>
            </form>
        </ContentWrapper>
    );
}