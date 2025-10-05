"use client"

import { createClient } from "@/lib/supabase/client"

export default function LogoutButton({ className = "" }) {
    const supabase = createClient()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Logout error:", error.message)
            return
        }
        window.location.href = "/login"
    }

    return (
        <button
            onClick={handleLogout}
            className={`px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition ${className}`}
        >
            Logout
        </button>
    )
}
