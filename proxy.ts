import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'pt']
const defaultLocale = 'es'

// export const config = {
//   matcher: ['/', '/(es|pt)/:path*']
// }

function getLocale(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries())
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
      // Skip all internal paths (_next, api, static files)
      '/((?!_next|api|favicon.ico|.*\\.).*)',
    ],
}
