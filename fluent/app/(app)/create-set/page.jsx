"use client";

import { useEffect, useState } from "react";
import LoggedinHeader from "@/components/loggedinHeader.jsx"
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement, restrictToWindowEdges, } from "@dnd-kit/modifiers";


export default function createSet() {
    const router = useRouter();

    // gate SSR: render nothing until the component mounts on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    //sttate: array of cards
    const [cards, setCards] = useState([
        { id: crypto.randomUUID(), term: "", defination: "" },
        { id: crypto.randomUUID(), term: "", defination: "" },
    ]);


    // simple validation: title & description & first card filled
    const isValid = () => {
        if (!title.trim() || !description.trim()) return false;
        const first = cards[0];
        if (!first) return false;
        return first.term.trim() && first.defination.trim();
    };



    const handleCreate = () => {
        if (!isValid()) {
            alert("Please fill title, description, and at least the first card (term & definition).");
            return;
        }

        const id = crypto.randomUUID();

        // shape we’ll store (adapt as you like)
        const setToSave = {
            id,
            title,
            description,
            level: "A1",            // you can collect these later from UI
            language: "Spanish",    // ^
            cards,
            // for the preview box:
            lastViewISO: null,      // null = never
            completedPct: 0,        // 0..100
            createdAt: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem("flashSets") || "[]");
        localStorage.setItem("flashSets", JSON.stringify([setToSave, ...prev]));

        // go to the list or directly to the set page
        router.push("/library/flashcard-sets");
    };

    //add new card
    const addCard = () => {
        setCards((prev) => [
            ...prev,
            { id: crypto.randomUUID(), term: "", defination: "" },

        ]);
    };

    //remove card by id
    const removeCard = (id) => {
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    //update card (when typing in inputs)
    const updateCard = (id, field, value) => {
        setCards(prev =>
            prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
        );
    };

    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Flashcards:", cards);
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
        <div className="bg-slate-800 flex flex-col min-h-screen pb-10 ">
            <header className='flex-shrink-0'>
                <LoggedinHeader />
            </header>

            <main className="grid grid-cols-1 mt-10 px-10 gap-16">

                <div className="flex justify-between">
                    <div>
                        <h2 className="font-medium text-3xl">Create a new flashcard set</h2>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-yellow-600 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 hover:bg-yellow-700">Create</button>
                        <button className="bg-amber-800 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 hover:bg-amber-900">Create and practice</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-20">
                    <div className="flex flex-col gap-3 items-center">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-400 text-black text-2xl px-3 py-2 rounded-lg w-4/5"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={description} onChange={(e) => setDescription(e.target.value)}
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
                                                        className="flex-1 bg-gray-400 rounded-lg py-2 px-3"
                                                    />

                                                    <input
                                                        type="text"
                                                        placeholder="Defination"
                                                        value={card.defination}
                                                        onChange={(e) => updateCard(card.id, "defination", e.target.value)}
                                                        className="flex-1 bg-gray-400 rounded-lg py-2 px-3"
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
                            disabled={!isValid()}
                            className="bg-yellow-600 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 hover:bg-yellow-700">Create
                        </button>
                        <button className="bg-amber-800 cursor-pointer font-semibold rounded-full text-2xl py-[6px] px-6 hover:bg-amber-900">Create and practice</button>
                    </div>
                </form>

            </main>
        </div>
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




//---drag handle: only this element starts the drag
// function DragHandle({ id }) {
//     //use a separate usesortable to get handle listeners/attributes for just the icon
//     const { attributes, listeners } = useSortable({ id });

//     return (
//         <button
//             type="button"
//             {...attributes}
//             {...listeners}
//             className="cursor-grab active:cursor-grabbing rounded-full bg-black/40 text-white px-2 py-1"
//             aria-label="Drag to reorder"
//             title="drag to reorder"
//         >
//             ⋮⋮
//         </button>
//     );
// }