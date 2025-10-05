// components/LogoutConfirm.jsx
"use client"
import { useState } from "react"

export default function LogoutConfirm({ onConfirm, children }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(true)}>{children}</button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold">Konfirmasi Logout</h3>
                        <p className="mt-2 text-sm text-gray-600">Yakin mau keluar dari akun?</p>
                        <div className="mt-4 flex gap-2 justify-end">
                            <button className="px-3 py-1 rounded" onClick={() => setOpen(false)}>Batal</button>
                            <button
                                onClick={async () => {
                                    setOpen(false)
                                    await onConfirm()
                                }}
                                className="px-3 py-1 rounded bg-red-600 text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
