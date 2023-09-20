import { useAuth } from '@/contexts/UserContext';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const url = new URL(request.nextUrl);

    console.log({ url: request.nextUrl }, '################');
}
