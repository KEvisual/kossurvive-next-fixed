export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const systemMessage = {
    role: "system",
    content: `Kamu adalah chatbot AI untuk website KoSurvive.
Website ini berisi fitur belajar, makanan sehat, olahraga, kalender harian, dan manajemen waktu.
Jawablah hanya pertanyaan yang berkaitan dengan fitur atau isi website ini.
Jika ada pertanyaan di luar topik, tolak dengan sopan.`,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [systemMessage, ...messages],
      }),
    });

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content || "Maaf, terjadi kesalahan.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Terjadi kesalahan server." });
  }
}
