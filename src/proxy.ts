import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (path.endsWith("/register") || path.endsWith("/login")) {
    const referer = request.headers.get("referer");
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        if (refererUrl.host !== request.headers.get("host")) {
          const response = intlMiddleware(request);
          response.cookies.set("redirect_origin", refererUrl.origin, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1800,
            path: "/",
          });
          return response;
        }
      } catch (e) {console.log(e);
       }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
