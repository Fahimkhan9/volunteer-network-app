import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
const protectedRoutes = ['/profile','/create','/events']
const publicRoutes = ['/login', '/signup','/forgotpassword','/forgotpassword/tokenverify']
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const token=request.cookies.get('token')?.value || ''
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  if (
    isPublicRoute &&
    token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }
   
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
   '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}