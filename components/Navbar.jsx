"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Yakin mau logout?")
        if (!confirmLogout) return

        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Logout error:", error.message)
            alert("Gagal logout, coba lagi")
        } else {
            router.push("/login")
        }
    }

    return (
        <header className="border-b border-gray-800 bg-transparent backdrop-blur-lg">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/Logo.png"
                        alt="KoSurvive Logo"
                        width={120}
                        height={48}
                        className="h-12 w-auto"
                        priority
                    />
                </Link>

                {/* Tabs */}
                <div className="flex gap-4">
                    <Link
                        href="/feed"
                        className="text-gray-300 hover:text-white transition font-medium"
                    >
                        Makanan Sehat
                    </Link>
                    <Link
                        href="/olahraga"
                        className="text-gray-300 hover:text-white transition font-medium"
                    >
                        Olahraga
                    </Link>
                    <Link
                        href="/belajar"
                        className="text-gray-300 hover:text-white transition font-medium"
                    >
                        Belajar
                    </Link>
                    <Link
                        href="/onboarding"
                        className="text-gray-300 hover:text-white transition font-medium"
                    >
                        Pilih Makanan
                    </Link>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
                >
                    Logout
                </button>
            </nav>
        </header>
    )
}
