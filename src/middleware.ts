import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define route matchers
const isAuditorRoute = createRouteMatcher(['/auditor(.*)']);
const isCollectorRoute = createRouteMatcher(['/collector(.*)']);
const isAiRoute = createRouteMatcher(['/ai(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const authObj = await auth();

  // 1. Check AI route (accessible by any authenticated user)
  if (isAiRoute(req)) {
    await auth.protect();
  }

  // Extract session claims and role. 
  // For local testing, we default to "admin" if no role is set in Clerk.
  const role = (authObj.sessionClaims?.metadata?.role as string | undefined) || "admin";

  // 2. Check Admin route
  if (req.nextUrl.pathname === '/') {
    await auth.protect();
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // 3. Check Auditor route (Admins & Auditors)
  if (isAuditorRoute(req)) {
    await auth.protect();
    if (role !== "admin" && role !== "auditor") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // 4. Check Collector route
  if (isCollectorRoute(req)) {
    await auth.protect();
    if (role !== "collector" && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
