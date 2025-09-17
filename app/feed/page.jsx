"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { rankRecipes } from "@/lib/reco";
import { RECIPES } from "@/lib/data";

function useUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setUser)
      .catch(() => setUser(null));
  }, []);
  return [user, setUser];
}

export default function Feed() {
  const [user] = useUser();
  const [items, setItems] = useState(RECIPES);
  const [score, setScore] = useState({});
  const observer = useRef(null);

  useEffect(() => {
    async function init() {
      const sres = await fetch("/api/recommend").then((r) => r.json());
      setScore(sres.score || {});
      setItems(rankRecipes(sres.score));
    }
    init();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-id");
            await fetch("/api/recommend/view", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ recipeId: id }),
            });
            e.target.classList.add("ring-2", "ring-emerald-600");
            setTimeout(
              () => e.target.classList.remove("ring-2", "ring-emerald-600"),
              800
            );
          }
        });
      },
      { threshold: 0.8 }
    );
    document
      .querySelectorAll(".recipe-card")
      .forEach((el) => observer.current.observe(el));
    return () => observer.current?.disconnect();
  }, [items]);

  async function act(id, action) {
    await fetch("/api/recommend/" + action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id }),
    });
    const sres = await fetch("/api/recommend").then((r) => r.json());
    setScore(sres.score || {});
    setItems(rankRecipes(sres.score));
  }

  return (
    <div className="grid gap-4">
      {items.map((r) => (
        <article
          key={r.id}
          data-id={r.id}
          className="recipe-card card overflow-hidden"
        >
          <img
            src={r.image}
            alt={r.name}
            className="w-full h-60 object-cover"
          />
          <div className="p-4 grid gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{r.name}</h3>
              <span className="badge">≈ Rp{r.estCost.toLocaleString()}</span>
            </div>
            <p className="text-gray-300 text-sm">
              Kategori: {r.categories.join(", ")}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>
                <p className="text-green-400">
                  <b>Bahan:</b>
                </p>
                <ul className="list-disc list-inside">
                  {r.ingredients.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>
                  <b>Tutorial:</b>
                </p>
                <p>{r.howto}</p>
                <p className="mt-2">
                  <b>Nutrisi:</b>{" "}
                  {Object.entries(r.nutrients)
                    .map(([k, v]) => `${k}:${v}`)
                    .join(" | ")}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => act(r.id, "like")}
                className="btn btn-outline"
              >
                Like
              </button>
              <button
                onClick={() => act(r.id, "save")}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
