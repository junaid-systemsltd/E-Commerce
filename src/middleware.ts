import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
    const { pathname } = new URL(req.url);
    const userCookie = req.cookies.get('user');

    if (userCookie) {
        const user = JSON.parse(userCookie?.value);

        // Handling Login & Register Routes for logged in User
        if (['/login', '/register'].includes(pathname)) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Handing Admins Routes for Non Admin User
        if (!user.isAdmin && pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/404', req.url));
        }
    } else {
        // Handling Admins Routes for Public
        if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // Handling Authenticated Routes
        if (['/profile'].includes(pathname)) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}
