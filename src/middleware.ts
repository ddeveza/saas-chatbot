import { createRouteMatcher, clerkMiddleware } from "@clerk/nextjs/server";

const publicRoutes = ["/", "/auth(.*)", "/portal(.*)"];
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware(
  (auth, req) => {
    if (!auth().userId && !isPublicRoute(req)) {
      return auth().redirectToSignIn();
    }
  },
  {
    debug: false,
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
