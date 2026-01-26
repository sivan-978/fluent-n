import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/library") {
        const url = req.nextUrl.clone();
        url.pathname = "/library/flashcard-sets";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

// Only run middleware for /library
export const config = {
    matcher: "/library",
};
