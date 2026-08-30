"use client";
import { useEffect, useState } from "react";
import FlashcardBoxPreview from "@/components/flashcardBoxPreview";
import { getMySets } from "@/lib/api"
import { Plus, Globe, ExternalLink, MoreVertical, BookOpen, Sparkles, Star, Layers, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link'

export default function SetsPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadSets() {
            try {
                const sets = await getMySets()

                const mapped = sets.map((s) => ({
                    id: s.id,
                    title: s.title,
                    level: s.level,
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
        <main className="flex flex-1 flex-col gap-8">

            <div className="flex items-center justify-between border-b-1 pb-5 border-amber-900">

                <div className="grid gap-2">
                    <h2 className="font-extrabold text-4xl text-[#673407]">My flashcard sets</h2>
                    <span className="text-[#965C09] text-sm font-medium">Organize your sets and keep learning</span>
                </div>

                <Link
                    href="/flashcard-sets/create"
                    className="flex gap-0 items-center justify-center font-medium py-2.5 px-4 bg-gradient-to-br from-[#d55900] to-[#f56600] hover:bg-[#e85d00] text-white rounded-xl"
                >
                    <Plus className="h-4 " /> Create new set
                </Link>
                
            </div>


            <div className="grid gap-5">

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[#e85d00] text-[18px] font-medium">{items.length} set</span>
                    </div>

                    <div className="flex gap-0 border-1 border-amber-900 rounded-xl">
                        <Link 
                            className="text-black py-2 px-3"
                            href="/3"
                        > 
                            <LayoutGrid className="h-5"/> 
                        </Link>

                        <Link 
                            className="text-black py-2 px-3" 
                            href="/3"
                        > 
                            <List className="h-5" /> 
                        </Link>

                    </div>
                </div>


                <div className="">
                    {items.length > 0 ? (
                        items.map((box, i) => <FlashcardBoxPreview key={i} data={box} />)
                    ) : (
                        <p className="text-amber-800 font-medium text-center">No flashcards available</p>
                    )}

                    <div className="flex flex-wrap gap-7">
                        <FlashcardBoxPreview items={items} setItems={setItems} />
                    </div>
                </div>

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
