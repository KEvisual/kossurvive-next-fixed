"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Navbar from "@/components/Navbar"

export default function ClientNavbar() {
    const supabase = createClient()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Ambil session user saat pertama load
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data?.user || null)
        }
        getUser()

        // Listen ke perubahan auth (login/logout)
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    // Kalau belum login, jangan render navbar
    if (!user) return null

    return <Navbar />
}
