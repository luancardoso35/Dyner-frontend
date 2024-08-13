import { NextRequest, NextResponse } from 'next/server'
export function middleware(request: NextRequest) {
    const token = request.cookies.get('dyner_auth_token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/locations', '/friends', '/venue/:path', '/venues/:path']
}