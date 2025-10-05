// app/auth/callback/route.js
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(req) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: () => cookies().getAll(),
                setAll: (arr) => arr.forEach(({ name, value }) => cookies().set(name, value)),
            },
        }
    )

    // Ambil session user
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        // kalau belum login, balik ke login
        return NextResponse.redirect(new URL("/login", req.url))
    }

    // kalau udah login, arahkan ke /
    return NextResponse.redirect(new URL("/", req.url))
}
