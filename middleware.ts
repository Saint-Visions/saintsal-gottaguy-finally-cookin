import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle Builder.io preview mode
  if (request.nextUrl.searchParams.get('builder.preview')) {
    const response = NextResponse.next()
    response.headers.set('x-builder-preview', 'true')
    return response
  }

  // Handle legacy client routes - redirect to new structure
  if (request.nextUrl.pathname.startsWith('/client/')) {
    const newPath = request.nextUrl.pathname.replace('/client', '')
    return NextResponse.redirect(new URL(newPath || '/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg|robots.txt).*)',
  ],
}
