import { ArrowLeft } from "lucide-react";
import ContentWrapper from "../../components/ContentWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormSwitch from "../../components/FormSwitch";
import { createUser } from "@/lib/users";

export default async function UserCreate() {
    return (
        <ContentWrapper>
            <a href="/admin/users" className="inline-flex items-center gap-2 mb-8" title="Go back">
                <ArrowLeft  size={20} />
                <span className="font-semibold text-sm">Go back</span>
            </a>

            <form action={createUser}>
                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" placeholder="Name" className="mt-2" required />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="example@email.com" className="mt-2" required />
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="Password" className="mt-2" required />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="is_admin">Admin</Label>
                        <FormSwitch name="is_admin" id="is_admin" isSwitchedOn={false} />
                    </div>
                </div>

                <Button type="submit" className="cursor-pointer">Send</Button>
            </form>
        </ContentWrapper>
    );
}