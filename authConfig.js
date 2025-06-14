import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }) {
      const protectedPaths = [/\/user\/(.*)/, /\/checkout\/(.*)/];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((path) => path.test(pathname)))
        return false;

      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();

        const response = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        });
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      }

      return true;
    },
  },
};
