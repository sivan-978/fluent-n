"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCards, getMySets } from "@/lib/api"

export default function FlashcardSetPage() {
    const { id } = useParams();
    const router = useRouter();
    const [setData, setSetData] = useState(null);
    const [loading, setLoading] = useState(true)
    // new state for viewer
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);


    useEffect(() => {
        async function load() {
            try {
                setLoading(true)

                const sets = await getMySets()
                const found = sets.find((s) => s.id === Number(id))

                if (!found) {
                    setSetData(null)
                    setLoading(false)
                    return
                }

                const cards = await getCards(Number(id))

                setSetData({
                    id: found.id,
                    title: found.title,
                    description: found.description,
                    cards: cards.map((c) => ({
                        id: c.id,
                        term: c.front_text,
                        defination: c.back_text,
                    })),
                })

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) load()
    }, [id])



    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-800">
                <p className="text-gray-300 text-xl">Loading set...</p>
            </div>
        )
    }


    if (!setData) {
        return (
            <div className="p-6 bg-amber-700  min-h-screen flex justify-center items-center overflow-hidden text-gray-200">
                <div className="flex flex-col gap-5 items-center bg-slate-800 p-18 max-h-52 rounded-xl">
                    <p className="text-2xl font-semibold">Set not found.</p>

                    <button onClick={() => router.push("/library/flashcard-sets")}
                        className="ml-4 px-3 py-1 rounded bg-slate-700 cursor-pointer hover:bg-slate-600">
                        Back to library
                    </button>
                </div>
            </div>
        );
    }


    const total = setData.cards?.length ?? 0;
    const current = setData.cards[idx];

    const next = () => {
        if (idx < total - 1) {
            setIdx((n) => n + 1);
            setFlipped(false);
        }
    };

    const prev = () => {
        if (idx > 0) {
            setIdx((n) => n - 1);
            setFlipped(false);
        }
    };

    const toggleFlip = () => setFlipped((f) => !f);


    return (
        <main className="bg-slate-800  min-h-screen flex justify-center overflow-hidden">
            <div className="w-4/5 flex flex-col items-center py-8  gap-20 min-w-0">

                <header className="flex flex-col items-center gap-2 w-full min-w-0">
                    <h1 className="text-4xl font-bold">{setData.title}</h1>
                    <h3 className="text-xl font-medium px-20  w-full max-w-full text-center break-words">{setData.description}</h3>
                </header>


                {/* the card (one at a time) */}
                <FlipCard
                    key={current?.id}
                    term={current?.term ?? ""}
                    definition={current?.defination ?? ""}
                    flipped={flipped}
                    onToggle={toggleFlip}
                />

                {/* controls */}
                <div className="flex items-center gap-5">
                    <button
                        onClick={prev}
                        disabled={idx === 0}
                        className={`px-4 py-2 rounded-lg ${idx === 0 ? "bg-slate-700/50" : "bg-slate-700 cursor-pointer"
                            }`}
                    >
                        Prev
                    </button>

                    {/* progress */}
                    <div className="text-sm text-gray-300">
                        Card {idx + 1} / {total}
                    </div>

                    <button
                        onClick={next}
                        disabled={idx === total - 1}
                        className={`px-4 py-2 rounded-lg ${idx === total - 1
                            ? "bg-slate-700/50"
                            : "bg-slate-700 cursor-pointer"
                            }`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </main>
    );
}


function FlipCard({ term, definition, flipped, onToggle }) {
    return (
        <div className=" w-full h-full max-h-3/5 max-w-2xl [perspective:1000px]">
            <button
                onClick={onToggle}
                className={`cursor-pointer relative w-full h-full rounded-xl bg-slate-800 shadow-[0px_0px_14px_rgba(0,0,0,1)] shadow-gray-500
                    transition-transform duration-300 [transform-style:preserve-3d]
                    ${flipped ? "[transform:rotateY(180deg)]" : ""}
                `}
            >
                <div
                    className="absolute inset-0 grid place-items-center p-6 text-2xl font-semibold w-full h-full min-w-0 text-center overflow-hidden
                     [backface-visibility:hidden]"
                >
                    <span className="block w-full max-w-full whitespace-normal [overflow-wrap:anywhere] ">
                        {term || <span className="text-gray-500">No term</span>}
                    </span>
                </div>

                <div
                    className="absolute inset-0 grid place-items-center p-6 text-2xl font-semibold
                     [transform:rotateY(180deg)] [backface-visibility:hidden]"
                >
                    <span className="block w-full max-w-full whitespace-normal [overflow-wrap:anywhere] ">
                        {definition || <span className="text-gray-500">No definition</span>}
                    </span>
                </div>
            </button>

            <p className="mt-3 text-center text-sm text-gray-400">
                Click the card to flip
            </p>
        </div>
    );
}


