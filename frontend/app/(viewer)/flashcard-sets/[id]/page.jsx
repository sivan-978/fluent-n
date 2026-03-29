"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCards, getMySets } from "@/lib/api"
import { BookOpen, Sparkles, Globe, Lightbulb, Star, Brain, ArrowLeft } from 'lucide-react';
import Link from "next/link";

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
        <main className="bg-gradient-to-br from-[#fff5e6] via-[#ffe8cc] to-[#ffd9a8] relative min-h-screen flex justify-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <BookOpen className="absolute top-12 left-8 w-20 h-20 text-[#fc6b03]/15 opacity-60" />
                <Sparkles className="absolute top-24 right-12 w-16 h-16 text-[#fc6b03]/20 opacity-70" />
                <Globe className="absolute top-1/4 left-16 w-24 h-24 text-[#965c09]/15 opacity-50" />
                <Brain className="absolute bottom-47 left-20 w-16 h-16 text-[#965c09]/15 opacity-80" />
                <Lightbulb className="absolute bottom-55 right-16 w-21 h-21 text-[#fc6b03]/20 opacity-70" />
                <Star className="absolute bottom-94 right-13 w-14 h-14 text-[#fc6b03]/15" />
            </div>

            <div className="w-4/5 flex flex-col items-center py-8  gap-20 min-w-0">

                <header className="flex flex-col items-center gap-2 w-full min-w-0">
                    <h1 className="text-2xl font-bold text-[#965c09]">{setData.title}</h1>
                    <h3 className="text-xl text-[#965c09] font-medium px-20  w-full max-w-full text-center break-words">{setData.description}</h3>
                </header>

                <Link href="/library/flashcard-sets" className="absolute top-12 left-60 flex gap-1.5 text-[#965c09] py-2 px-4 text-xl rounded-2xl border-2 border-[#fc6b03]/30 bg-[#fff5e6] hover:bg-[#fef0dd] font-medium justify-center items-center  ">
                    <ArrowLeft className=" w-5 h-5" />
                    Exit
                </Link>

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
                        className={`px-8 py-2 rounded-lg ${idx === 0 ? "bg-[#c88b36]" : "bg-[#9c5f0b] cursor-pointer"
                            }`}
                    >
                        Prev
                    </button>

                    {/* progress */}
                    <div className="text-[#965c09]/60 text-sm font-semibold">
                        Card {idx + 1} / {total}
                    </div>

                    <button
                        onClick={next}
                        disabled={idx === total - 1}
                        className={`px-8 py-2 rounded-lg ${idx === total - 1
                            ? "bg-[#c88b36]"
                            : "bg-[#9c5f0b] cursor-pointer"
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
        <div className="relative w-full h-full max-h-3/5 max-w-2xl [perspective:1000px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <Star className="absolute top-4 right-4 w-6 h-6 text-[#fc6b03]/50" />
                <Sparkles className="absolute bottom-4 left-4 w-6 h-6 text-[#fc6b03]/50" />
            </div>

            <button
                onClick={onToggle}
                className={`w-full h-full bg-gradient-to-br from-white to-[#fff5e6] rounded-3xl shadow-2xl border-2 border-[#fc6b03]/40 p-12 cursor-pointer transition-all hover:shadow-3xl relative
                    duration-300 [transform-style:preserve-3d]
                    ${flipped ? "[transform:rotateY(180deg)] ring-4 ring-[#fc6b03]/30" : ""}
                `}
            >
                <div
                    className="absolute inset-0 grid place-items-center p-6 text-2xl font-semibold w-full h-full min-w-0 text-center overflow-hidden
                     [backface-visibility:hidden]"
                >
                    <span className="text-5xl font-bold text-[#965c09] block w-full max-w-full whitespace-normal [overflow-wrap:anywhere] ">
                        {term || <span className="text-5xl font-bold text-[#965c09]">No term</span>}
                    </span>
                </div>

                <div
                    className="absolute inset-0 grid place-items-center p-6 text-2xl font-semibold
                     [transform:rotateY(180deg)] [backface-visibility:hidden]"
                >
                    <span className="text-5xl font-bold text-[#965c09] block w-full max-w-full whitespace-normal [overflow-wrap:anywhere] ">
                        {definition || <span className="text-[#965c09]">No definition</span>}
                    </span>
                </div>
            </button>

            <p className="mt-3 text-center text-[#965c09]/50 text-sm font-semibold">
                Click the card to flip
            </p>
        </div>
    );
}


