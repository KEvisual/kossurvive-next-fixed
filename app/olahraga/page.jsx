"use client";
import { useEffect, useState } from "react";

export default function Olahraga() {
  const [workouts, setWorkouts] = useState([]);
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [activated, setActivated] = useState(false);
  const [recommendedWorkout, setRecommendedWorkout] = useState(null);

  useEffect(() => {
    fetch("/api/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  async function submitMood() {
    if (!mood) {
      setToast("Silakan pilih mood dulu!");
      setTimeout(() => setToast(""), 2500);
      return;
    }

    await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood }),
    });

    const moodSolutions = {
      "🔥 Semangat": "Pertahankan energi positifmu hari ini!",
      "🙂 Biasa": "Hari yang tenang, nikmati momen sederhana.",
      "😴 Lelah": "Coba istirahat sejenak atau lakukan olahraga ringan.",
      "😕 Stres":
        "Ambil napas dalam-dalam, coba olahraga singkat untuk relaksasi.",
    };

    const workoutSuggestions = {
      "🔥 Semangat": {
        name: "5 Menit Full Body",
        moves: [
          "Jumping jack 60s",
          "Push-up 30s",
          "Plank 30s",
          "Squat 45s",
          "Stretch 1m",
        ],
      },
      "🙂 Biasa": {
        name: "Plank Ladder",
        moves: ["Plank 20s", "Rest 10s", "Plank 30s", "Rest 10s", "Plank 40s"],
      },
      "😴 Lelah": {
        name: "Stretching Kamar",
        moves: [
          "Neck roll",
          "Shoulder stretch",
          "Hamstring stretch",
          "Hip opener",
        ],
      },
      "😕 Stres": {
        name: "Stretching Kamar",
        moves: [
          "Neck roll",
          "Shoulder stretch",
          "Hamstring stretch",
          "Hip opener",
        ],
      },
    };

    setMessage(moodSolutions[mood] || "");
    setRecommendedWorkout(workoutSuggestions[mood] || null);
    setMood("");
    setToast("Rekaman anda sudah di simpan !");
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div className="grid gap-6">
      {/* Bagian olahraga utama */}
      <section className="card p-5">
        <h1 className="text-2xl font-bold mb-3">Olahraga ringan di kost</h1>
        <div className="grid gap-4">
          {workouts.map((w) => (
            <div key={w.id} className="border border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold">{w.name}</h3>
              <ul className="list-disc list-inside text-gray-300">
                {w.moves.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bagian Mood Tracker */}
      <section className="card p-5 relative">
        <h2 className="text-xl font-semibold mb-2">Mood Tracker</h2>
        <div className="flex gap-3 flex-wrap">
          {["🔥 Semangat", "🙂 Biasa", "😴 Lelah", "😕 Stres"].map((x) => (
            <button
              key={x}
              onClick={() => {
                setMood(x);
                setActivated(true);
              }}
              className={`badge transform transition-all duration-200 active:scale-95 ${
                mood === x
                  ? "bg-emerald-700 text-white border border-emerald-500 shadow-lg"
                  : activated
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-700"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
        <button
          onClick={submitMood}
          className="btn btn-primary mt-4 transform transition active:scale-95"
        >
          Simpan Mood
        </button>

        {/* Pesan solusi */}
        {message && (
          <div className="mt-3 p-3 rounded bg-emerald-900 text-white animate-fade-in">
            {message}
          </div>
        )}

        {/* Rekomendasi olahraga */}
        {recommendedWorkout && (
          <div className="mt-4 border border-gray-700 rounded-xl p-4 bg-gray-800/70">
            <h3 className="font-semibold">{recommendedWorkout.name}</h3>
            <ul className="list-disc list-inside text-gray-300">
              {recommendedWorkout.moves.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
            {toast}
          </div>
        )}
      </section>
    </div>
  );
}
