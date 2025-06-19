import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/admin']

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.isAdmin) {
        return NextResponse.rewrite(new URL('/404', request.url))
    }
    return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}