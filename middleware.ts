import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect only app routes
    "/((?!.*\\..*|_next|sign-in|sign-up|sso-callback).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
