"use client";
import { useEffect, useState } from "react";
import FlashcardBoxPreview from "@/components/flashcardBoxPreview";
import { getMySets } from "@/lib/api"

export default function SetsPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadSets() {
            try {
                const sets = await getMySets()

                const mapped = sets.map((s) => ({
                    id: s.id,
                    title: s.title,
                    level: "A1",
                    language: "Spanish",
                    lastView: s.created_at ? timeAgo(s.created_at) : "never",
                    cardsCount: s.flashcards?.length ?? 0,
                    completed: "0%",
                    bg: "/icons/boxBg.jpg",
                }))

                setItems(mapped)
            } catch (err) {
                console.error(err)
            }
        }

        loadSets()
    }, [])


    return (
        <main className="flex flex-1 flex-col px-9 gap-8 mt-10">
            <div className="flex items-center justify-between ">
                <span className="font-medium text-xl text-gray-400">{items.length} flascard sets</span>
                <button className="bg-red-800 hover:bg-red-900 text-white font-semibold px-4 py-2 rounded-lg">
                    delete all
                </button>
            </div>

            {items.length > 0 ? (
                items.map((box, i) => <FlashcardBoxPreview key={i} data={box} />)
            ) : (
                <p className="text-gray-400">No flashcards available.</p>
            )}

            <div className="grid grid-cols-3 gap-7">
                <FlashcardBoxPreview items={items} />
            </div>
        </main>
    )
}

function timeAgo(iso) {
    const d = new Date(iso);
    const diff = Math.max(0, Date.now() - d.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "today";
    if (days === 1) return "1d ago";
    return `${days}d ago`;
}
