"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const sync = async () => {
            await fetch("/api/user/sync", { method: "POST" })
            router.replace("/")
        }
        sync()
    }, [router])

    return <p className="text-center text-white">Menyelesaikan login...</p>
}
