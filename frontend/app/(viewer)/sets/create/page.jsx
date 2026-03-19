"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider } from "@/app/_providers/sidebarProvider";
import LoggedinHeader from "@/components/loggedinHeader.jsx"
import SideNav from "@/components/sideNav";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement, restrictToWindowEdges, } from "@dnd-kit/modifiers";
import { createSet, createCard } from "@/lib/api"

export default function createSetPage() {
    const router = useRouter();

    // gate SSR: render nothing until the component mounts on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [submitted, setSubmitted] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
            <div className="bg-slate-800 flex flex-col h-screen">
                <header className='flex-shrink-0'>
                    <LoggedinHeader />
                </header>

                <div className='flex flex-1 overflow-hidden'>
                    <aside className='flex-shrink-0 bg-slate-700 min-h-full'>
                        <SideNav />
                    </aside>


                    <main className=" grid flex-1 mt-10 px-10 gap-16 pb-10  overflow-auto ">

                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-medium text-3xl">Create a new flashcard set</h2>
                            </div>

                            <div className="flex gap-4">
                                <button type="submit" onClick={handleCreate} className="bg-yellow-600 cursor-pointer font-semibold rounded-full text-2xl  px-6 max-h-11 hover:bg-yellow-700">Create</button>
                                <button type="submit" className="bg-amber-800 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 max-h-11 hover:bg-amber-900">Create and practice</button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-20">
                            <div className="flex flex-col gap-3 items-center">
                                <input
                                    type="text"
                                    placeholder={`${submitted && !title.trim() ? "Please enter a Title to create the set." : "Term"}`}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`bg-gray-400 text-black text-2xl px-3 py-2 rounded-lg w-4/5 ${submitted && !title.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : "border-2"}`}
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="bg-gray-400 text-black text-2xl px-3 py-2 rounded-lg w-4/5"
                                />
                            </div>

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} modifiers={[restrictToVerticalAxis,/*only up/down*/ restrictToParentElement,/*stay inside parent container*/ restrictToWindowEdges,/*optional: also clamp to viewport*/]}>
                                <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>

                                    <div className="grid grid-cols-1 gap-4">
                                        {cards.map((card, idx) => (
                                            <SortableCard key={card.id} id={card.id}>
                                                {({ attributes, listeners }) => (
                                                    <div key={card.id} className="flex flex-col gap-3 px-10 py-4 pb-6 bg-gray-600 text-black text-2xl rounded-xl">

                                                        <div className="flex justify-between cursor-grab" {...attributes} {...listeners}>
                                                            <span className="text-gray-200">{idx + 1}</span>

                                                            <button type="button" onClick={() => removeCard(card.id)}>
                                                                <img src="/icons/delete.png" alt="delete" className="w-10 bg-gray-400 py-2 px-2 rounded-full cursor-pointer hover:bg-gray-500" />
                                                            </button>
                                                        </div>


                                                        <div className="flex gap-7">
                                                            <input
                                                                type="text"
                                                                placeholder="Term"
                                                                value={card.term}
                                                                onChange={(e) => updateCard(card.id, "term", e.target.value)}
                                                                className={`flex-1 bg-gray-400 rounded-lg py-2 px-3 ${submitted &&  idx === 0 && !card.term.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : ""}`}
                                                            />

                                                            <input
                                                                type="text"
                                                                placeholder="Defination"
                                                                value={card.defination}
                                                                onChange={(e) => updateCard(card.id, "defination", e.target.value)}
                                                                className={`flex-1 bg-gray-400 rounded-lg py-2 px-3 ${submitted &&  idx === 0 && !card.defination.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : ""}`}
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-13 px-3">
                                                            <span className="text-xl font-medium">Term</span>
                                                            <span className="text-xl font-medium">Defination</span>
                                                        </div>

                                                    </div>
                                                )}
                                            </SortableCard>
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={addCard}
                                    className="bg-yellow-600 cursor-pointer font-semibold rounded-full text-2xl py-4 px-6 hover:bg-yellow-700"
                                >
                                    Add a card
                                </button>
                            </div>

                            <div className="flex gap-4 justify-end">
                                <button
                                    type="submit"
                                    onClick={handleCreate}
                                    className="bg-yellow-600 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 hover:bg-yellow-700">Create
                                </button>
                                <button className="bg-amber-800 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 hover:bg-amber-900">Create and practice</button>
                            </div>
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
