export const metadata = {
  title: "KosSurvive",
  description: "Sehat hemat belajar—khusus anak kos.",
};

import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <header className="navbar border-b border-gray-800">
          <nav className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="KoSurvive Logo"
                width={120} // atur sesuai ukuran asli logo
                height={48} // samakan dengan tinggi navbar (misalnya py-3 → ~48px)
                className="h-12 w-auto" // h-12 = 48px, otomatis pas
                priority
              />
            </Link>

            <div className="flex gap-2">
              <Link className="tab" href="/feed">
                Makanan sehat
              </Link>
              <Link className="tab" href="/olahraga">
                Olahraga
              </Link>
              <Link className="tab" href="/belajar">
                Belajar
              </Link>
              <Link className="tab" href="/onboarding">
                Pilih makanan
              </Link>
            </div>
          </nav>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="container py-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DevSpectra - KoSurvive.
        </footer>
      </body>
    </html>
  );
}
