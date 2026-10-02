import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Custom logic can go here if needed in the future
    return;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // 1. ALWAYS allow access to the login page. 
        // This stops the infinite redirect loop!
        if (path.startsWith("/admin/login")) {
          return true;
        }

        // 2. Require a token for all other /admin routes
        if (path.startsWith("/admin")) {
          return !!token;
        }

        // 3. Allow everything else
        return true;
      },
    },
    pages: {
      signIn: "/admin/login", // Tells NextAuth to use your custom login page
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};