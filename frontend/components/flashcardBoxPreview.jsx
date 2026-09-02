"use client";

import Link from "next/link";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {deleteSet} from "@/lib/api.ts"


export default function flashcardBoxPreview({ items = [], setItems }) {
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [deletingId, setDeletingId] = useState(null);


    //close 3 dots menu when is clicked anywhere on the screen
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // delete set function
    async function handleDeleteSet(id) {
        try {
            setDeletingId(id);

            await deleteSet(id);

            setItems((prev) => prev.filter((item) => item.id !== id));
            setOpenMenu(null);

        } catch (error) {
            console.error("Failed to delete set:", error);
        } finally {
            setDeletingId(null);
        }
    }


    return (

        items.map((box) => (
            <div key={box.id} className="relative">

                <Link
                    href={`/flashcard-sets/${box.id}`}
                    className=' flex flex-col max-w-[340px] w-[340px] bg-[#FFF4E3] border border-[#8B4513] rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(121,72,25,0.25)] hover:shadow-[0_6px_18px_rgba(121,72,25,0.35)] transition-shadow'
                >   

                    <div>
                        <img className="w-full object-cover h-60 object-top" src={box.bg} alt="background img" />
                    </div>


                    <div className="flex flex-col gap-4 px-5 py-4">

                        <div className="flex flex-col gap-2 overflow-hidden">
                            <p className="text-[#7A3E0A] font-bold text-2xl overflow-hidden overflow-ellipsis break-words">
                                {box.title}
                            </p>

                            <div className="flex gap-1.5 items-center leading-tight">
                                {box.level && (
                                    <span className="text-sm border border-[#8B4513] text-[#8B4513] px-1.5 rounded-lg font-semibold">
                                        {box.level}
                                    </span>
                                )}
                                <span className="text-sm border border-[#8B4513] text-[#8B4513] px-1.5 rounded-lg font-semibold">{box.target_language}</span>
                            </div>
                        </div>


                        <div className='flex flex-col text-sm text-[#965b09e8] font-semibold leading-tight'>
                            <span>{box.cardsCount} cards</span>
                            <span>Last reviewed {box.lastView} </span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <div  className='flex-1 min-h-2 bg-[#D88900] rounded-full'></div>

                            <p className='text-[#7e4d08] '>{box.completed} completed</p>
                        </div>

                    </div>

                </Link>


                {/* 3 dots */}
                <div  ref={menuRef}>

                    <button
                        type="button"
                        onClick={() => setOpenMenu(openMenu === box.id ? null : box.id)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-[#965c09] hover:bg-[#fbe9d0]"
                    >
                        <EllipsisVertical className="w-5 h-5" />
                    </button>

                    {openMenu === box.id && (
                        <div className="absolute right-2 top-13 px-6 py-4 bg-[#fff8f0] border border-[#965c09]/10 rounded-2xl shadow-xl z-[200]">

                            <button
                                type="button"
                                disabled={deletingId === box.id}
                                onClick={() => handleDeleteSet(box.id)}
                                className="w-full flex items-center px-4 py-2 gap-2 rounded-xl text-red-600 bg-red-100 hover:bg-red-200 transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="font-semibold text-[15px]"> {deletingId === box.id ? "Deleting..." : "Delete set"} </span>
                            </button>

                        </div>
                    )}
                </div>
                
            </div>
        ))

    )
}
