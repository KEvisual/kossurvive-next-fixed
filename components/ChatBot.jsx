"use client";
import { useState, useEffect, useRef } from "react";
import { RotateCcw, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const initial = [
    { sender: "bot", text: "Hai! Aku chatbot KoSurvive. Mau tanya apa?" },
  ];
  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesRef = useRef(null);

  const keywordMap = [
    {
      keywords: ["makanan", "makan", "resep", "sehat"],
      replies: [
        "Tumis kangkung + nasi merah 🍚",
        "Telur rebus + sayur sop 🥚",
        "Oatmeal buah potong 🍓",
        "Tumis tahu tempe + bayam 🥬",
      ],
    },
    {
      keywords: ["olahraga", "latihan", "senam", "workout"],
      replies: [
        "Plank 30 detik 🔥",
        "20 push-up (sesuaikan kemampuan) 💪",
        "20 squat + 20 jumping jack 🏃",
        "Stretching ringan 10 menit 🧘",
      ],
    },
    {
      keywords: ["belajar", "skill", "materi", "edukasi"],
      replies: [
        "Belajar HTML & CSS dasar 💻",
        "Coba latihan kecil: bikin one-page project 🎯",
        "Belajar editing video singkat di CapCut 🎬",
        "Belajar bahasa asing 15 menit tiap hari 📚",
      ],
    },
    {
      keywords: ["kalender", "jadwal", "agenda", "aktivitas"],
      replies: [
        "Tulis to-do harian dan beri prioritas 📅",
        "Buat reminder untuk 1 tugas penting sehari ⏰",
        "Bagi tugas ke blok 25 menit (Pomodoro) ⏳",
        "Tandai tanggal penting di kalender mingguan 🗓️",
      ],
    },
  ];

  const findMatch = (text) => {
    const lower = text.toLowerCase();
    return keywordMap.find((item) =>
      item.keywords.some((k) => lower.includes(k))
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const matched = findMatch(userMsg.text);
    setIsTyping(true);

    setTimeout(() => {
      if (matched) {
        const shuffled = [...matched.replies].sort(() => Math.random() - 0.5);
        const count = Math.min(
          3,
          Math.max(2, Math.floor(Math.random() * 2) + 2)
        );
        const picked = shuffled.slice(0, count);
        const replyText = `Rekomendasi:\n- ${picked.join("\n- ")}`;
        setMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Maaf, aku belum paham 😅. Coba tanya seputar: makanan, olahraga, belajar, atau kalender.",
          },
        ]);
      }
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRefresh = () => {
    setMessages(initial);
    setIsTyping(false);
  };

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-4 right-4">
      {/* Tombol toggle chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Kotak chatbot muncul dengan animasi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="w-80"
          >
            <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-700">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-2 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-wide">
                    KoSurvive Chatbot
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    title="Refresh chat"
                    className="p-1 rounded-full hover:bg-gray-600 transition"
                  >
                    <RotateCcw
                      size={18}
                      className="text-gray-300 hover:text-blue-400"
                    />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-red-400 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* BODY */}
              <div
                ref={messagesRef}
                className="h-80 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-xl max-w-[80%] whitespace-pre-wrap ${
                      m.sender === "user"
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}

                {isTyping && (
                  <div className="px-3 py-2 rounded-xl bg-gray-700 text-gray-300 w-fit flex gap-1">
                    <span className="animate-bounce">•</span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    >
                      •
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    >
                      •
                    </span>
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div className="flex items-center gap-2 p-3 bg-gray-800">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Tanya sesuatu..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Chat input"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 px-4 py-2 rounded-full text-white hover:bg-blue-500 transition"
                >
                  Kirim
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
