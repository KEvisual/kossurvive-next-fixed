"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./kalender.css";
import { useRouter } from "next/navigation";
import { formatLocalDate } from "@/lib/data";

export default function Kalender() {
  const [date, setDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("activities")) || [];
    if (Array.isArray(saved)) setActivities(saved);
  }, []);

  const handleTambah = () => {
    const localDate = formatLocalDate(date);
    localStorage.setItem("selectedDate", localDate);
    router.push("/tambah-aktivitas");
  };

  const handleHapusSemua = () => {
    if (confirm("Yakin ingin menghapus semua aktivitas?")) {
      localStorage.removeItem("activities");
      setActivities([]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold mb-2">🗓 Kalender Aktivitas</h1>

      <div className="rounded-xl shadow-lg p-4 bg-gray-900 border border-gray-700">
        <Calendar onChange={setDate} value={date} className="dark-calendar" />
      </div>

      <p className="mt-2 text-gray-300">
        Tanggal yang dipilih:{" "}
        <span className="font-semibold text-emerald-400">
          {date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>

      <button
        onClick={handleTambah}
        className="bg-emerald-500 px-4 py-2 rounded-lg mt-3 hover:bg-emerald-600"
      >
        ➕ Tambah Aktivitas
      </button>

      <div className="mt-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Aktivitas Tersimpan</h2>
          {activities.length > 0 && (
            <button
              onClick={handleHapusSemua}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
            >
              🗑 Hapus Aktivitas
            </button>
          )}
        </div>

        {activities.length === 0 ? (
          <p className="text-gray-400">Belum ada aktivitas tersimpan.</p>
        ) : (
          <div className="grid gap-3">
            {activities.map((a, i) => (
              <div
                key={i}
                className="border border-gray-700 p-3 rounded-xl bg-gray-800"
              >
                <p className="text-gray-300">{a.date}</p>
                <p className="text-emerald-400 font-semibold">{a.workout}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
