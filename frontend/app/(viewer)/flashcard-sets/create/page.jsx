"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider } from "@/app/_providers/sidebarProvider";
import LoggedinHeader from "@/components/loggedinHeader.jsx"
import SideNav from "@/components/sideNav";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement, restrictToWindowEdges, } from "@dnd-kit/modifiers";
import { createSet, createCard } from "@/lib/api"

import { ArrowLeft, Plus, Trash2, BookOpen, Globe, Sparkles, Star, X } from 'lucide-react';



export default function createSetPage() {
    const router = useRouter();

    // gate SSR: render nothing until the component mounts on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [submitted, setSubmitted] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");

    const [cancelModal, setCancelModal] = useState(false);

    const [cards, setCards] = useState([
        { id: crypto.randomUUID(), term: "", defination: "" },
        { id: crypto.randomUUID(), term: "", defination: "" },
    ]);
    const id = crypto.randomUUID();


    // simple validation: title & description & first card filled
    const first = cards[0];
    const isValid = () => {
        if (!title.trim()) return false;
        if (!first) return false;
        return first.term.trim() && first.defination.trim();
    };

    const handleCreate = async () => {
        setSubmitted(true)

        if (!isValid()) return

        try {
            // create set in backend
            const newSet = await createSet(title, description)

            // create cards
            for (const card of cards) {
            if (!card.term.trim()) continue

            await createCard(
                newSet.id,
                card.term,
                card.defination
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

    //update card (because term and defination is in object n not single values like title n description)
    const updateCard = (id, field, value) => {
        setCards(prev =>
            prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
        );
    };

    //add new card
    const addCard = () => {
        setCards((prev) => [
            ...prev,
            { id: crypto.randomUUID(), term: "", defination: "" },
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

                <header className='flex-shrink-0'>
                    <LoggedinHeader />
                </header>

                <div className='flex flex-1 overflow-hidden'>
                    
                    <aside className='flex-shrink-0 bg-slate-700 min-h-full'>
                        <SideNav />
                    </aside>


                    <main className="grid flex-1 pt-8 px-60 gap-16 pb-10 bg-gradient-to-br from-[#fff3e3] to-[#ffe0b8] overflow-auto ">

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

                            {/* top section */}
                            <div className="flex flex-col gap-3 p-10 relative bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-2xl border-2 border-[#fc6b03]/10 ">
                                
                                <div className="absolute top-4 right-4 text-[#fc6b03]/30">
                                    <Star className="w-6 h-6" />
                                </div>

                                {/* Title */}
                                <div className="w-full">
                                    <label className="block text-[#965c09] font-bold mb-2 text-sm">
                                        Title <span className="text-[#fc6b03]">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder={`${submitted && !title.trim() ? "Please enter a Title to create the set." : "Enter a title, like 'Spanish Vocabulary - Chapter 3' 📚"}`}
                                        className={`w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] transition-colors text-[#965c09] placeholder:text-[#965c09]/40 ${submitted && !title.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : ""}`}
                                    />
                                </div>

                                {/* Description */}
                                <div className="w-full">
                                    <label className="block text-[#965c09] font-bold mb-2 text-sm">
                                        Description (optional)
                                    </label>

                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Add a description to help you remember what this set is about 💡"
                                        rows={3}
                                        className="w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] transition-colors text-[#965c09] placeholder:text-[#965c09]/40 resize-none"
                                    />
                                </div>

                                {/* Language selectors */}
                                <div className="grid grid-cols-2 gap-6">

                                    <div>
                                        <label className="flex items-center gap-2 text-[#fc6b03] font-bold mb-2 text-sm">
                                            <Globe className="w-4 h-4" />
                                            Source Language
                                        </label>

                                        <select
                                            value={sourceLanguage}
                                            onChange={(e) => setSourceLanguage(e.target.value)}
                                            className="w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] transition-colors text-[#965c09] font-medium cursor-pointer"
                                        >
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>German</option>
                                            <option>Italian</option>
                                            <option>Portuguese</option>
                                            <option>Chinese</option>
                                            <option>Japanese</option>
                                            <option>Korean</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-[#fc6b03] font-bold mb-2 text-sm">
                                            <Globe className="w-4 h-4" />
                                            Target Language
                                        </label>

                                        <select
                                            value={targetLanguage}
                                            onChange={(e) => setTargetLanguage(e.target.value)}
                                            className="w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] transition-colors text-[#965c09] font-medium cursor-pointer"
                                        >
                                            <option>Spanish</option>
                                            <option>English</option>
                                            <option>French</option>
                                            <option>German</option>
                                            <option>Italian</option>
                                            <option>Portuguese</option>
                                            <option>Chinese</option>
                                            <option>Japanese</option>
                                            <option>Korean</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} modifiers={[restrictToVerticalAxis,/*only up/down*/ restrictToParentElement,/*stay inside parent container*/ restrictToWindowEdges,/*optional: also clamp to viewport*/]}>
                                <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>

                                    <div className="grid grid-cols-1 gap-4">
                                        {cards.map((card, idx) => (
                                            <SortableCard key={card.id} id={card.id}>
                                                {({ attributes, listeners }) => (
                                                    <div key={card.id} className="flex items-center gap-4 px-10 pt-7 pb-10 bg-white/90 backdrop-blur-sm shadow-2xl border-[#fc6b03]/40 border-2 outline-none text-2xl rounded-2xl">

                                                        {/* Card number */}
                                                        <div className="flex items-center justify-center flex-shrink-0 mt-5 text-sm text-white w-7 h-7 bg-gradient-to-br from-[#d35a03] to-[#813901] rounded-full font-black shadow-md">
                                                            {idx + 1}
                                                        </div>
                                                        
                                                        {/* Input fields */}
                                                        <div className="flex flex-1 flex-col gap-1">
                                                            <label className="text-[#965c09] text-sm font-medium" htmlFor="">Spanish</label>

                                                            <input
                                                                type="text"
                                                                placeholder="Term"
                                                                value={card.term}
                                                                onChange={(e) => updateCard(card.id, "term", e.target.value)}
                                                                className={`flex-1 bg-white rounded-lg py-2 px-3 border-2 border-[#fc6b03]/20 outline-none focus:border-[#fc6b03] placeholder:text-[#b47a29]/70 placeholder:text-sm placeholder:font-medium ${submitted &&  idx === 0 && !card.term.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : ""}`}
                                                            />
                                                        </div>


                                                        <div className="flex flex-1 flex-col gap-1">
                                                            <label className="text-[#965c09] text-sm font-medium" htmlFor="">English</label>

                                                            <input
                                                                type="text"
                                                                placeholder="Defination"
                                                                value={card.defination}
                                                                onChange={(e) => updateCard(card.id, "defination", e.target.value)}
                                                                className={`flex-1 bg-white rounded-lg py-2 px-3 border-2 border-[#fc6b03]/20 outline-none focus:border-[#fc6b03] placeholder:text-[#b47a29]/70 placeholder:text-sm placeholder:font-medium ${submitted &&  idx === 0 && !card.defination.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : ""}`}
                                                            />
                                                        </div>


                                                        {/* Delete button */}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCard(card.id)}
                                                            disabled={cards.length === 1}
                                                            className={`flex-shrink-0 p-3 mt-6 rounded-xl transition-all ${
                                                                cards.length === 1
                                                                ? 'text-gray-300 cursor-not-allowed'
                                                                : 'text-[#fc6b03] hover:bg-[#fc6b03] hover:text-white'
                                                            }`}
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                        
                                                    </div>
                                                )}
                                            </SortableCard>
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>

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
                                <div className="flex items-center justify-center fixed inset-0 z-50">

                                    {/* Background */}
                                    <div className="flex flex-col gap-3 px-32 py-10 justify-center items-center relative shadow-xl border-2 border-[#fc6b03] rounded-2xl bg-[#fcf5ec]">

                                        <p className="mb-4 font-semibold text-[#965c09]">
                                            Discard changes?
                                        </p>

                                        <div className="flex gap-5">
                                            {/* Stay */}
                                            <button
                                                onClick={() => setCancelModal(false)}
                                                className="px-4 py-2 rounded-xl bg-[#fde2c2] text-[#965c09] font-semibold hover:bg-[#f0d2ac]"
                                            >
                                                Stay
                                            </button>

                                            {/* Leave */}
                                            <button
                                                onClick={() => router.push("/dashboard")}
                                                className="px-4 py-2 rounded-xl bg-[#fc6b03] text-white font-semibold hover:bg-[#e85d00]"
                                            >
                                                Leave
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>
                            )}

                        </form>

                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}


//---sortable wrapper for a single card---
function SortableCard({ id, children }) {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={style}>
            {children({ attributes, listeners })}
        </div>
    );
}
