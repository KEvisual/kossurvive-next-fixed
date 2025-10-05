import "./globals.css"
import ClientNavbar from "@/components/ClientNavbar"

export const metadata = {
  title: "KosSurvive",
  description: "Sehat hemat belajar—khusus anak kos.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Navbar di client biar bisa reaktif */}
        <ClientNavbar />
        <main className="container py-6">{children}</main>
        <footer className="container py-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DevSpectra - KoSurvive.
        </footer>
      </body>
    </html>
  )
}
