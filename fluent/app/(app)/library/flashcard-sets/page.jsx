"use client";
import { useEffect, useState } from "react";
import FlashcardBoxPreview from "@/components/flashcardBoxPreview";


export default function SetsPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const all = JSON.parse(localStorage.getItem("flashSets") || "[]");
        // map to the shape your preview expects
        const mapped = all.map(s => ({
            id: s.id,
            title: s.title,
            level: s.level ?? "A1",
            language: s.language ?? "Spanish",
            lastView: s.lastViewISO ? timeAgo(s.lastViewISO) : "never",
            cardsCount: s.cards?.length ?? 0,
            completed: `${Math.round(s.completedPct ?? 0)}%`,
            // any extra fields your box uses:
            bg: "/icons/boxBg.jpg",
        }));
        setItems(mapped);
    }, []);

    const deleteAll = () => {
        localStorage.removeItem("flashSets"); // clear localStorage
        setItems([]); // reset state so UI updates
    };


    return (
        <main className="flex flex-1 flex-col px-9 gap-8 mt-10">
            <div className="flex items-center justify-between ">
                <span className="font-medium text-xl text-gray-400">{items.length} flascard sets</span>
                <button onClick={deleteAll} className="bg-red-800 hover:bg-red-900 text-white font-semibold px-4 py-2 rounded-lg">
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
