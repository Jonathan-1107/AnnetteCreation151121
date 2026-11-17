/**
 * middleware.js — Vercel Edge Middleware
 *
 * Runs on every request BEFORE the page is served.
 * Reads the free `x-vercel-ip-country` header that Vercel injects automatically
 * and writes it into a cookie so React can read it client-side.
 *
 * No external API or paid plan required.
 * The cookie `annette_country` will contain a 2-letter ISO country code (e.g. "IN", "DE", "US").
 */
export const config = {
  // Run on all routes except static assets, API routes, and favicon files
  matcher: ['/((?!api|_next/static|_next/image|favicon|logo\\.png|placeholder\\.svg|icons\\.svg|video).*)'],
};

export default function middleware(request) {
  // Vercel injects this header on all deployments (Hobby plan included)
  const country = request.headers.get('x-vercel-ip-country') || 'IN';

  // Clone the request URL for the response
  const response = new Response(null, {
    status: 200,
    headers: {
      // Set cookie: 1 hour, accessible to JS, works on all subpaths
      'Set-Cookie': `annette_country=${country}; Path=/; SameSite=Lax; Max-Age=3600`,
    },
  });

  return response;
}
