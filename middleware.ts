import { type NextRequest, NextResponse, type NextFetchEvent } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(50, "10s"),
  ephemeralCache: new Map(),
  prefix: "@upstash/ratelimit",
  analytics: true,
});


export async function middleware(request: NextRequest, context: NextFetchEvent): Promise<Response | undefined> {

  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, remaining } = await ratelimit.limit(ip);
  context.waitUntil(pending);
  await updateSession(request)
  
  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/error", request.url));

    res.headers.set("X-RateLimit-Success", success.toString());
    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());

    return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}