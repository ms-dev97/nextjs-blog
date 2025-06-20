import { ArrowLeft } from "lucide-react";
import ContentWrapper from "../../components/ContentWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormSwitch from "../../components/FormSwitch";
import { createCategory } from "@/lib/categories";

export default async function CategoryCreate() {
    return (
        <ContentWrapper>
            <a href="/admin/categories" className="inline-flex items-center gap-2 mb-8" title="Go back">
                <ArrowLeft  size={20} />
                <span className="font-semibold text-sm">Go back</span>
            </a>

            <form action={createCategory}>
                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Title" className="mt-2" required />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input type="text" id="slug" name="slug" placeholder="slug" className="mt-2" />
                    </div>
                </div>

                <div className="mb-5 md:grid md:grid-cols-2 md:gap-5">
                    <div>
                        <Label className="mb-2" htmlFor="status">Status</Label>
                        <FormSwitch name="status" id="status" isSwitchedOn={true} />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="featured">Featured</Label>
                        <FormSwitch name="featured" id="featured" isSwitchedOn={false} />
                    </div>
                </div>

                <Button type="submit" className="cursor-pointer">Send</Button>
            </form>
        </ContentWrapper>
    );
}