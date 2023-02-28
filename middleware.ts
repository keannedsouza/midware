import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Beware loops when redirecting to the same directory
export function middleware (request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard'){
    console.log('Redirecting to /')
    return NextResponse.redirect('/')
  }
}

export const config = {
  matcher: ['/dashboard']
}