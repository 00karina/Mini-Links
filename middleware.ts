// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// List of protected routes
const protectedRoutes = ['/history']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Only check for protected paths
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}
