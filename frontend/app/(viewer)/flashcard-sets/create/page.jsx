"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider } from "@/app/_providers/sidebarProvider";
import LoggedinHeader from "@/components/layout/loggedinHeader.jsx"
import SideNav from "@/components/layout/sideNav";
import FlashcardSetDetails from "@/components/flashcards/flashcardSetDetails";
import FlashcardList from "@/components/flashcards/flashcardList";
import FlashcardCancelModal from "@/components/flashcards/flashcardCancelModal";


import { PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { arrayMove, } from "@dnd-kit/sortable";
import { createSet, createCard, getLanguages  } from "@/lib/api"

import { Plus, BookOpen, Globe, Sparkles, Star, X } from 'lucide-react';



export default function createSetPage() {
    const router = useRouter();

    // gate SSR: render nothing until the component mounts on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [submitted, setSubmitted] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");

    const [languages, setLanguages] = useState([]);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");

    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const data = await getLanguages();
                setLanguages(data);
            } catch (error) {
                console.error("Failed to load languages:", error);
            }
        };

        loadLanguages();
    }, []);

    const sourceLanguageLabel = languages.find((lang) => lang.code === sourceLanguage)?.label || "Source";
    const targetLanguageLabel = languages.find((lang) => lang.code === targetLanguage)?.label || "Target";

    const [cancelModal, setCancelModal] = useState(false);

    const [cards, setCards] = useState([
        { id: crypto.randomUUID(), term: "", definition: "" },
        { id: crypto.randomUUID(), term: "", definition: "" },
    ]);
    const id = crypto.randomUUID();


    // simple validation: title & description & first card filled
    const first = cards[0];
    const isValid = () => {
        if (!title.trim()) return false;
        if (!first) return false;
        return first.term.trim() && first.definition.trim();
    };


    // create a set
    const handleCreate = async () => {
        setSubmitted(true)

        if (!isValid()) return

        try {
            // create set in backend
            const newSet = await createSet(title, description, sourceLanguage, targetLanguage, level)

            // create cards
            for (const card of cards) {
            if (!card.term.trim()) continue

            await createCard(
                newSet.id,
                card.term,
                card.definition
            )
            }

            // go to library page
            router.push("/library/flashcard-sets")

        } catch (err) {
            console.error(err)
            alert("Failed to create set")
        }
    }


    //remove card by id
    const removeCard = (id) => {
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    //update card (because term and definition is in object n not single values like title n description)
    const updateCard = (id, field, value) => {
        setCards(prev =>
            prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
        );
    };

    //add new card
    const addCard = () => {
        setCards((prev) => [
            ...prev,
            { id: crypto.randomUUID(), term: "", definition: "" },
        ]);
    };


    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    };


    //---dnd-kit sensors (mouse/touch)---
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
    );

    //---when a drag ends, reorder the array---
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = cards.findIndex((c) => c.id === active.id);
        const newIndex = cards.findIndex((c) => c.id === over.id);
        setCards((prev) => arrayMove(prev, oldIndex, newIndex));
    };


    if (!mounted) return null;


    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex flex-col min-h-screen relative">

                {/* decoration */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Top Left */}
                    <div className="absolute top-40 left-18 text-[#fc6b03]/20">
                        <BookOpen className="w-16 h-16" />
                    </div>

                    {/* Top Right */}
                    <div className="absolute top-32 right-10 text-[#fc6b03]/20">
                        <Sparkles className="w-12 h-12" />
                    </div>

                    {/* Center Left */}
                    <div className="absolute top-1/2 left-10 text-[#fc6b03]/15">
                        <Star className="w-10 h-10" />
                    </div>

                    {/* Center Right */}
                    <div className="absolute top-1/2 right-10 text-[#fc6b03]/15">
                        <Star className="w-10 h-10" />
                    </div>

                    {/* Bottom Left */}
                    <div className="absolute bottom-10 left-10 text-[#965c09]/20">
                        <Globe className="w-20 h-20" />
                    </div>

                    {/* Bottom Right */}
                    <div className="absolute bottom-10 right-10 text-[#fc6b03]/20">
                        <Sparkles className="w-12 h-12" />
                    </div>
                </div>

                <header className='fixed w-full z-[100] flex-shrink-0'>
                    <LoggedinHeader />
                </header>

                <div className='flex flex-1 overflow-visible'>
                    
                    <aside className='flex-shrink-0 bg-slate-700 min-h-full'>
                        <SideNav />
                    </aside>


                    <main className="grid flex-1 mt-19 pt-8 px-60 gap-16 pb-10 bg-gradient-to-br from-[#fff3e3] to-[#ffe0b8] overflow-visible ">

                        <div className="flex justify-center">
                            {/* welcoming */}
                            <div className="text-center mb-8">
                                <h1 className="flex items-center justify-center gap-3 mb-2 text-3xl font-black text-[#965c09]">
                                    <BookOpen className="w-7 h-7 text-[#fc6b03]" />
                                    Create a new flashcard set
                                    <Sparkles className="w-6 h-6 text-[#fc6b03]" />
                                </h1>

                                <p className="text-[#965c09]/60 font-medium text-[16px]">
                                    Build your perfect study set and master any language! 🚀
                                </p>
                            </div>
                        </div>



                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10">

                            {/* detail section top of page*/}
                            <FlashcardSetDetails title={title}
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


                            {/* flashcard list section*/}
                            <FlashcardList
                                cards={cards}
                                sensors={sensors}
                                onDragEnd={onDragEnd}
                                sourceLanguageLabel={sourceLanguageLabel}
                                targetLanguageLabel={targetLanguageLabel}
                                updateCard={updateCard}
                                removeCard={removeCard}
                                submitted={submitted}
                            />
                            

                            <div className="flex justify-center">
                                {/* Add card button */}
                                <button
                                    onClick={addCard}
                                    className="flex items-center justify-center gap-2 group w-full py-4 cursor-pointer text-[#965c09] text-lg font-semibold bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#c76006]/90 hover:border-[#c76006] rounded-[18px] hover:bg-white/90 transition-all"
                                >
                                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    Add another card
                                </button>
                            </div>

                            <div className="flex gap-4 justify-between">
                                <button 
                                    type="button"
                                    onClick={() => setCancelModal(true)}
                                    className="flex gap-2 font-medium text-lg items-center px-2 py-2 rounded-xl text-[#965c09] cursor-pointer "
                                >
                                    <X className="h-5 w-5"/>
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    onClick={handleCreate}
                                    className="bg-gradient-to-br from-[#e7941f] to-[#965c09] cursor-pointer font-semibold rounded-xl text-lg py-0 px-8 opacity-80 hover:opacity-100 transition-all duration-100"
                                >
                                    Create Set
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border-[#fc6b03]/50 border-2 bg-gradient-to-br from-[#fae8cf] to-[#fcd29c]">
                                    <Sparkles className="w-4 h-4 text-[#fc6b03]" />
                                    <span className="text-sm font-medium text-[#965c09]">{cards.length} {cards.length === 1 ? "card" : "cards"} in this set</span>
                                    <Star className="w-4 h-4 text-[#fc6b03]" />
                                </div>
                            </div>

                            {cancelModal && (
                                <FlashcardCancelModal
                                    onStay={() => setCancelModal(false)}
                                    onLeave={() => router.push("/dashboard")}
                                />
                            )}

                        </form>

                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
