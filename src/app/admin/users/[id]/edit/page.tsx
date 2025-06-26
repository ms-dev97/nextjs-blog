import ContentWrapper from "@/app/admin/components/ContentWrapper";
import FormSwitch from "@/app/admin/components/FormSwitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategory, updateCategory } from "@/lib/categories";
import { getUser, updateUser } from "@/lib/users";
import { ArrowLeft } from "lucide-react";

export default async function UpdateUser({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const user = await getUser(+id);

    async function updateAction(formdata: FormData) {
        'use server';
        await updateUser(formdata, +id);
    }

    return (
        <ContentWrapper>
            <a href="/admin/users" className="inline-flex items-center gap-2 mb-8" title="Go back">
                <ArrowLeft  size={20} />
                <span className="font-semibold text-sm">Go back</span>
            </a>

            <form action={updateAction}>
                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" defaultValue={user?.name} placeholder="Name" className="mt-2" required />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" defaultValue={user?.email} placeholder="example@email.com" className="mt-2" required />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="Password" className="mt-2" />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="is_admin">Admin</Label>
                        <FormSwitch name="is_admin" id="is_admin" isSwitchedOn={user?.is_admin ?? false} />
                    </div>
                </div>
                
                <Button type="submit" className="cursor-pointer">Send</Button>
            </form>
        </ContentWrapper>
    );
}