import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // You might need to adjust the cookie name based on your authentication implementation
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname === '/login' || pathname === '/signup';
    const isProtectedRoute = pathname.startsWith('/dashboard');

    // If trying to access login/signup while already logged in, redirect to dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If trying to access dashboard/protected routes while NOT logged in, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
}