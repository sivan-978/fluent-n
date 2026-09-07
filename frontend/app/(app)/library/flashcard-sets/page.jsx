"use client";

import { useEffect, useState } from "react";
import Link from 'next/link'
import { Plus, Globe, ExternalLink, MoreVertical, BookOpen, Sparkles, Star, Layers, LayoutGrid, List } from 'lucide-react';

import FlashcardBoxPreview from "@/components/flashcards/flashcardBoxPreview";
import DeleteFlashcardSetsModal from "@/components/flashcards/deleteFlashcardSetsModal";
import { getMySets, getLanguages, deleteSet } from "@/lib/api"



export default function SetsPage() {
    const [items, setItems] = useState([]);
    const [languages, setLanguages] = useState([]);

    //multible flashcard set delete functionality
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedSetIds, setSelectedSetIds] = useState([]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeletingSelected, setIsDeletingSelected] = useState(false);

    // delete function
    async function handleDeleteSelected() {
        if (selectedSetIds.length === 0) return;

        try {
            setIsDeletingSelected(true);

            await Promise.all(
                selectedSetIds.map((id) => deleteSet(id))
            );

            setItems((prev) =>
                prev.filter(
                    (item) => !selectedSetIds.includes(item.id)
                )
            );

            setSelectedSetIds([]);
            setSelectionMode(false);
            setDeleteModalOpen(false);

        } catch (error) {
            console.error("Failed to delete selected sets:", error);

        } finally {
            setIsDeletingSelected(false);
        }
    }

    
    useEffect(() => {
        async function loadData() {
            try {
                const [sets, languagesData] = await Promise.all([
                    getMySets(),
                    getLanguages()
                ]);

                setLanguages(languagesData);

                const mapped = sets.map((s) => ({
                    id: s.id,
                    title: s.title,
                    level: s.level,

                    target_language: languagesData.find((lang) => lang.code === s.target_language)?.label || s.target_language,
                    lastView: s.created_at ? timeAgo(s.created_at) : "never",
                    cardsCount: s.cards_count,
                    completed: "0%",
                    bg: "/icons/boxBg.jpg",
                }));

                setItems(mapped);

            } catch (err) {
                console.error(err);
            }
        }

        loadData();
    }, []);


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
                    <div className="flex items-center gap-5">

                        <span className="text-[#e85d00] text-[18px] font-medium">
                            {items.length} {items.length === 1 ? "set" : "sets"}
                        </span>


                        {!selectionMode ? (
                            <button
                                type="button"
                                onClick={() => setSelectionMode(true)}
                                className="px-4 py-2 text-sm font-semibold text-[#965c09] border border-[#965c09]/30 rounded-lg bg-[#fff8f0] hover:bg-[#fbe9d0] hover:border-[#965c09]/50 transition-all"
                            >
                                Select
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectionMode(false);
                                        setSelectedSetIds([]);
                                    }}
                                    className="px-4 py-2 text-sm font-semibold text-[#965c09] border border-[#965c09]/30 rounded-lg bg-[#fff8f0] hover:bg-[#fbe9d0] hover:border-[#965c09]/50 transition-all"
                                >
                                    Cancel
                                </button>

                                {selectedSetIds.length > 0 && (
                                    <span className="px-3 py-2 text-sm font-medium text-[#965c09] bg-[#fbe9d0] rounded-lg">
                                        {selectedSetIds.length} selected
                                    </span>
                                )}
                            </>
                        )}
                    </div>


                    <div className="flex items-center gap-4">

                        {selectionMode && (
                            <button
                                type="button"
                                onClick={() => setDeleteModalOpen(true)}
                                disabled={selectedSetIds.length === 0}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                                    selectedSetIds.length === 0
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
                                }`}
                            >
                                Delete ({selectedSetIds.length})
                            </button>
                        )}

                        <div className="flex gap-0 border border-amber-900 rounded-xl">
                            <Link
                                className="text-black py-2 px-3"
                                href="/3"
                            >
                                <LayoutGrid className="h-5" />
                            </Link>

                            <Link
                                className="text-black py-2 px-3"
                                href="/3"
                            >
                                <List className="h-5" />
                            </Link>
                        </div>

                    </div>
                </div>


                <div className="flex flex-wrap gap-7">

                    {items.length > 0 ? (
                        items.map((box) => (
                            <FlashcardBoxPreview
                                key={box.id}
                                data={box}
                                setItems={setItems}
                                selectionMode={selectionMode}
                                isSelected={selectedSetIds.includes(box.id)}
                                onSelect={() => {
                                    setSelectedSetIds((prev) =>
                                        prev.includes(box.id)
                                            ? prev.filter((id) => id !== box.id)
                                            : [...prev, box.id]
                                    );
                                }}
                            />
                        ))
                    ) : (
                        <p className="w-full text-amber-800 font-medium text-center">
                            No flashcards available
                        </p>
                    )}

                </div>

            </div>


            {/* deleting confirmation module*/}
            {deleteModalOpen && (
                <DeleteFlashcardSetsModal
                    selectedCount={selectedSetIds.length}
                    isDeleting={isDeletingSelected}
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDeleteSelected}
                />
            )}

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
