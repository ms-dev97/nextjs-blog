import { SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logout } from "@/lib/auth";

export default async function Header() {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);
    const user = (await db.select({name: usersTable.name}).from(usersTable).where(eq(usersTable.id, session?.userId as number)).limit(1)).at(0);
    
    return (
        <header className="p-3 border-b border-b-slate-200 flex items-center gap-5">
            <SidebarTrigger />
            <span>Hello, <span className="font-medium">{user?.name}</span></span>
            <form action={logout} className="ms-auto">
                <button type="submit" className="cursor-pointer underline">Logout</button>
            </form>
        </header>
    );
}