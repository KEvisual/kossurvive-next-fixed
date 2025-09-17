import ChatBot from "@/components/ChatBot";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="grid gap-6">
        <div className="card p-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to KoSurvive</h1>
          <p className="text-gray-300">
            Aplikasi buat anak kos: resep hemat & sehat, olahraga tanpa alat,
            dan belajar skill cepat.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/onboarding"
            className="card p-6 hover:bg-emerald-900 transition"
          >
            <h2 className="text-xl font-semibold mb-1">Pilih makanan</h2>
            <p className="text-gray-400">
              Pilih preferensi makanan kamu di kost.
            </p>
          </Link>

          <Link
            href="/feed"
            className="card p-6 hover:bg-emerald-900 transition"
          >
            <h2 className="text-xl font-semibold mb-1">
              Resep sehat ala anak kost
            </h2>
            <p className="text-gray-400">
              Scroll feed resep sehat ala anak kost.
            </p>
          </Link>

          <Link
            href="/olahraga"
            className="card p-6 hover:bg-emerald-900 transition"
          >
            <h2 className="text-xl font-semibold mb-1">Olahraga Kos</h2>
            <p className="text-gray-400">Latihan simpel + mood tracker.</p>
          </Link>

          <Link
            href="/belajar"
            className="card p-6 hover:bg-emerald-900 transition"
          >
            <h2 className="text-xl font-semibold mb-1">Belajar di Kos</h2>
            <p className="text-gray-400">
              Belajar yang bisa di lakukan di kost
            </p>
          </Link>

          <Link
            href="/kalender"
            className="card p-6 hover:bg-emerald-900 transition"
          >
            <h2 className="text-xl font-semibold mb-1">Kalender Aktivitas</h2>
            <p className="text-gray-400">
              Bikin tanda aktivitas kamu di kalender aktivitas ini !
            </p>
          </Link>
        </div>
      </section>
      <ChatBot /> {/* ✅ chatbot muncul di pojok kanan bawah */}
    </>
  );
}
