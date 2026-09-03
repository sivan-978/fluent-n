"use client";

import { DndContext, closestCenter} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { Trash2 } from "lucide-react";



export default function FlashcardList({ cards, sensors, onDragEnd, sourceLanguageLabel, targetLanguageLabel, updateCard, removeCard, submitted, }) {

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[
                restrictToVerticalAxis,
                restrictToParentElement,
                restrictToWindowEdges,
            ]}
        >

            <SortableContext
                items={cards.map((card) => card.id)}
                strategy={verticalListSortingStrategy}
            >

                <div className="grid grid-cols-1 gap-4">

                    {cards.map((card, idx) => (
                        <SortableCard key={card.id} id={card.id}>

                            {({ attributes, listeners }) => (
                                <div
                                    {...attributes}
                                    {...listeners}
                                    className="flex items-center gap-4 px-10 pt-7 pb-10 bg-white/90 backdrop-blur-sm shadow-2xl border-[#fc6b03]/40 border-2 outline-none text-2xl rounded-2xl"
                                >

                                    {/* Card number */}
                                    <div className="flex items-center justify-center flex-shrink-0 mt-5 text-sm text-white w-7 h-7 bg-gradient-to-br from-[#d35a03] to-[#813901] rounded-full font-black shadow-md">
                                        {idx + 1}
                                    </div>


                                    {/* Term */}
                                    <div className="flex flex-1 flex-col gap-1">

                                        <label className="text-[#965c09] text-sm font-medium"> {sourceLanguageLabel} </label>

                                        <input
                                            type="text"
                                            placeholder="Term"
                                            value={card.term}
                                            onChange={(e) =>
                                                updateCard( card.id, "term", e.target.value)
                                            }
                                            className={`flex-1 text-[#965c09] bg-white rounded-lg py-2 px-3 border-2 border-[#fc6b03]/20 outline-none focus:border-[#fc6b03] placeholder:text-[#b47a29]/70 placeholder:text-sm placeholder:font-medium ${
                                                submitted &&
                                                idx === 0 &&
                                                !card.term.trim()
                                                    ? "border-red-500 placeholder-gray-900 placeholder:font-medium"
                                                    : ""
                                            }`}
                                        />
                                    </div>


                                    {/* Definition */}
                                    <div className="flex flex-1 flex-col gap-1">

                                        <label className="text-[#965c09] text-sm font-medium"> {targetLanguageLabel} </label>

                                        <input
                                            type="text"
                                            placeholder="Definition"
                                            value={card.defination}
                                            onChange={(e) =>
                                                updateCard( card.id, "defination", e.target.value )
                                            }
                                            className={`flex-1 bg-white text-[#965c09] rounded-lg py-2 px-3 border-2 border-[#fc6b03]/20 outline-none focus:border-[#fc6b03] placeholder:text-[#b47a29]/70 placeholder:text-sm placeholder:font-medium ${
                                                submitted &&
                                                idx === 0 &&
                                                !card.defination.trim()
                                                    ? "border-red-500 placeholder-gray-900 placeholder:font-medium"
                                                    : ""
                                            }`}
                                        />
                                    </div>


                                    {/* Delete button */}
                                    <button
                                        type="button"
                                        onClick={() => removeCard(card.id)}
                                        disabled={cards.length === 1}
                                        className={`flex-shrink-0 p-3 mt-6 rounded-xl transition-all ${
                                            cards.length === 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-[#fc6b03] hover:bg-[#fc6b03] hover:text-white"
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
