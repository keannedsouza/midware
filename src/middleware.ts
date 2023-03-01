import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const url = request.nextUrl

  // Redirect to 404 if URL starts with _site
  if (url.pathname.startsWith('/_site')) {
    console.log(`Redirecting to 404 for ${url.pathname}`)
    return new Response("Sorry, we couldn't find that page.", { status: 404, statusText: 'Not Found' })
  }

  // Redirect to entered subdomain if a dot is present in the hostname
  if (hostname && hostname.indexOf('.') !== -1) {
    const subdomain = hostname.split('.')[0]
    console.log(`Redirecting to _site/${subdomain}`)
    const url = request.nextUrl.clone()
    url.pathname = `/_site/${subdomain}`
    return NextResponse.rewrite(url)
  }

  console.log('middleware: ' + hostname)
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
