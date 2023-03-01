import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname:any = request.headers.get('host')

  // Redirect to entered subdomain
  const subdomain = hostname.split('.')[0]
  if (subdomain) {
    console.log(`Redirecting to ${hostname}/${subdomain}`)
    const url = request.nextUrl.clone()
    url.hostname = hostname.replace(`${subdomain}.`, '')
    url.pathname = `/${subdomain}` + url.pathname
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


// if (request.nextUrl.pathname === '/dashboard'){
//   const url = request.nextUrl.clone()
//   url.pathname = '/user'
//   return NextResponse.redirect(url)
// }