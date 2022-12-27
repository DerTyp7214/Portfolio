import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (url.host === 'rboard.dev' && url.pathname === '/') {
    url.pathname = '/rboard'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/',
}
