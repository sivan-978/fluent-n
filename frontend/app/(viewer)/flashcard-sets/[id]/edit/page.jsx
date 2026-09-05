"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { SidebarProvider } from "@/app/_providers/sidebarProvider";
import LoggedinHeader from "@/components/layout/loggedinHeader";
import SideNav from "@/components/layout/sideNav";

import FlashcardSetDetails from "@/components/flashcards/flashcardSetDetails";
import FlashcardList from "@/components/flashcards/flashcardList";
import FlashcardCancelModal from "@/components/flashcards/flashcardCancelModal";

import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { getLanguages, getSet, updateSet, updateCard, createCard, deleteCard } from "@/lib/api";

import { Plus, BookOpen, Globe, Sparkles, Star, X} from "lucide-react";




export default function EditingSetPage() {
    const router = useRouter();
    const { id } = useParams();

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);

    const [submitted, setSubmitted] = useState(false);

    // Set information
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");

    // Languages
    const [languages, setLanguages] = useState([]);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");

    // Flashcards
    const [cards, setCards] = useState([]);

    // Cancel modal
    const [cancelModal, setCancelModal] = useState(false);

    const [deletedCardIds, setDeletedCardIds] = useState([]);


    useEffect(() => {
        setMounted(true);
    }, []);


    // Load languages and flashcard set
    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const [languagesData, setData] = await Promise.all([
                    getLanguages(),
                    getSet(id),
                ]);

                console.log("SET DATA:", setData);
                console.log("FLASHCARDS:", setData.flashcards);

                // Languages
                setLanguages(languagesData);

                // Flashcard set details
                setTitle(setData.title);
                setDescription(setData.description || "");
                setLevel(setData.level || "");

                setSourceLanguage(setData.source_language);
                setTargetLanguage(setData.target_language);

                // Flashcards
                setCards(
                    (setData.flashcards || []).map((card) => ({
                        id: card.id,
                        term: card.term || "",
                        defination: card.defination || "",
                        isExisting: true,
                    }))
                );

            } catch (error) {
                console.error("Failed to load flashcard set:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadData();
        }
    }, [id]);


    // language labels
    const sourceLanguageLabel =
        languages.find((lang) => lang.code === sourceLanguage)?.label || "Source";

    const targetLanguageLabel =
        languages.find((lang) => lang.code === targetLanguage)?.label || "Target";


    // validation
    const first = cards[0];

    const isValid = () => {
        if (!title.trim()) return false;
        if (!first) return false;

        return first.term.trim() && first.defination.trim();
    };


    // update a card locally
    const updateCardLocally = (cardId, field, value) => {
        setCards((prev) =>
            prev.map((card) =>
                card.id === cardId
                    ? { ...card, [field]: value }
                    : card
            )
        );
    };


    // remove a card locally
    const removeCard = (cardId) => {
        const cardToRemove = cards.find(
            (card) => card.id === cardId
        );

        // only existing database cards need a DELETE request
        if (cardToRemove?.isExisting) {
            setDeletedCardIds((prev) => [
                ...prev,
                cardId
            ]);
        }

        setCards((prev) =>
            prev.filter((card) => card.id !== cardId)
        );
    };


    // add a new card locally
    const addCard = () => {
        setCards((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                term: "",
                defination: "",
                isExisting: false,
            },
        ]);
    };

    // drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 4,
            },
        })
    );


    const onDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = cards.findIndex(
            (card) => card.id === active.id
        );

        const newIndex = cards.findIndex(
            (card) => card.id === over.id
        );

        setCards((prev) =>
            arrayMove(prev, oldIndex, newIndex)
        );
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitted(true);

        if (!isValid()) return;

        try {
            // 1. Update flashcard set information
            await updateSet(
                id,
                title,
                description,
                sourceLanguage,
                targetLanguage,
                level
            );

            // 2. Update existing cards
            const existingCards = cards.filter(
                (card) => card.isExisting
            );

            await Promise.all(
                existingCards.map((card) =>
                    updateCard(
                        card.id,
                        card.term,
                        card.defination
                    )
                )
            );

            // 3. Create newly added cards
            const newCards = cards.filter(
                (card) => !card.isExisting
            );

            await Promise.all(
                newCards.map((card) =>
                    createCard(
                        id,
                        card.term,
                        card.defination
                    )
                )
            );

            // 4. Delete removed cards
            await Promise.all(
                deletedCardIds.map((cardId) =>
                    deleteCard(cardId)
                )
            );

            router.push("/library/flashcard-sets");

        } catch (error) {
            console.error("Failed to update flashcard set:", error);
            alert("Failed to save changes");
        }
    };


    if (!mounted || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }


    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex flex-col min-h-screen relative">

                {/* Background decorations */}
                <div className="absolute inset-0 z-0 pointer-events-none">

                    <div className="absolute top-40 left-18 text-[#fc6b03]/20">
                        <BookOpen className="w-16 h-16" />
                    </div>

                    <div className="absolute top-32 right-10 text-[#fc6b03]/20">
                        <Sparkles className="w-12 h-12" />
                    </div>

                    <div className="absolute top-1/2 left-10 text-[#fc6b03]/15">
                        <Star className="w-10 h-10" />
                    </div>

                    <div className="absolute top-1/2 right-10 text-[#fc6b03]/15">
                        <Star className="w-10 h-10" />
                    </div>

                    <div className="absolute bottom-10 left-10 text-[#965c09]/20">
                        <Globe className="w-20 h-20" />
                    </div>

                    <div className="absolute bottom-10 right-10 text-[#fc6b03]/20">
                        <Sparkles className="w-12 h-12" />
                    </div>

                </div>


                <header className="fixed w-full z-[100] flex-shrink-0">
                    <LoggedinHeader />
                </header>


                <div className="flex flex-1 overflow-visible">

                    <aside className="flex-shrink-0 bg-slate-700 min-h-full">
                        <SideNav />
                    </aside>


                    <main className="grid flex-1 mt-19 pt-8 px-60 gap-16 pb-10 bg-gradient-to-br from-[#fff3e3] to-[#ffe0b8]">

                        {/* Page heading */}
                        <div className="flex justify-center">

                            <div className="text-center mb-8">

                                <h1 className="flex items-center justify-center gap-3 mb-2 text-3xl font-black text-[#965c09]">

                                    <BookOpen className="w-7 h-7 text-[#fc6b03]" />

                                    Edit flashcard set

                                    <Sparkles className="w-6 h-6 text-[#fc6b03]" />

                                </h1>

                                <p className="text-[#965c09]/60 font-medium text-[16px]">
                                    Update your flashcard set and cards.
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-10"
                        >

                            {/* Set details */}
                            <FlashcardSetDetails
                                title={title}
                                setTitle={setTitle}

                                description={description}
                                setDescription={setDescription}

                                sourceLanguage={sourceLanguage}
                                setSourceLanguage={setSourceLanguage}

                                targetLanguage={targetLanguage}
                                setTargetLanguage={setTargetLanguage}

                                languages={languages}

                                level={level}
                                setLevel={setLevel}

                                submitted={submitted}
                            />


                            {/* Flashcards */}
                            <FlashcardList
                                cards={cards}

                                sensors={sensors}
                                onDragEnd={onDragEnd}

                                sourceLanguageLabel={sourceLanguageLabel}
                                targetLanguageLabel={targetLanguageLabel}

                                updateCard={updateCardLocally}
                                removeCard={removeCard}

                                submitted={submitted}
                            />


                            {/* Add card */}
                            <div className="flex justify-center">

                                <button
                                    type="button"
                                    onClick={addCard}
                                    className="flex items-center justify-center gap-2 group w-full py-4 cursor-pointer text-[#965c09] text-lg font-semibold bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#c76006]/90 hover:border-[#c76006] rounded-[18px] hover:bg-white/90 transition-all"
                                >
                                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />

                                    Add another card

                                </button>

                            </div>


                            {/* Buttons */}
                            <div className="flex gap-4 justify-between">

                                <button
                                    type="button"
                                    onClick={() => setCancelModal(true)}
                                    className="flex gap-2 font-medium text-lg items-center px-2 py-2 rounded-xl text-[#965c09] cursor-pointer"
                                >
                                    <X className="h-5 w-5" />

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="bg-gradient-to-br from-[#e7941f] to-[#965c09] cursor-pointer font-semibold rounded-xl text-lg py-3 px-8 text-white"
                                >
                                    Save Changes
                                </button>

                            </div>


                            {/* Card counter */}
                            <div className="flex items-center justify-center">

                                <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border-[#fc6b03]/50 border-2 bg-gradient-to-br from-[#fae8cf] to-[#fcd29c]">

                                    <Sparkles className="w-4 h-4 text-[#fc6b03]" />

                                    <span className="text-sm font-medium text-[#965c09]">
                                        {cards.length}{" "}
                                        {cards.length === 1 ? "card" : "cards"} in this set
                                    </span>

                                    <Star className="w-4 h-4 text-[#fc6b03]" />

                                </div>

                            </div>


                            {/* Cancel modal */}
                            {cancelModal && (
                                <FlashcardCancelModal
                                    onStay={() => setCancelModal(false)}
                                    onLeave={() =>
                                        router.push("/library/flashcard-sets")
                                    }
                                />
                            )}

                        </form>

                    </main>

                </div>

            </div>
        </SidebarProvider>
    );
}