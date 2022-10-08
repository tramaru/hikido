import { NextRequest, NextResponse } from 'next/server'

const { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } = process.env

export const config = {
  matcher: ['/'],
}

export const middleware = (req: NextRequest) => {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === BASIC_AUTH_USER && pwd === BASIC_AUTH_PASSWORD) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
