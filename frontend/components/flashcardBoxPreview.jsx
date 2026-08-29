"use client";

import Link from "next/link";


export default function flashcardBoxPreview({ items = [] }) {

    return (

        items.map((box) => (
            <div key={box.id} className="col-span-1">

                <Link
                    href={`/flashcard-sets/${box.id}`}
                    className=' flex flex-col max-w-[360px] min-w-[360px] w-[360px] bg-[#FFF4E3] border border-[#8B4513] rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(121,72,25,0.25)] hover:shadow-[0_6px_18px_rgba(121,72,25,0.35)] transition-shadow'
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
                                <span className="text-sm border border-[#8B4513] text-[#8B4513] px-1.5 rounded-lg font-semibold">{box.level}</span>
                                <span className="text-sm border border-[#8B4513] text-[#8B4513] px-1.5 rounded-lg font-semibold">{box.language}</span>
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
                
            </div>
        ))

    )
}
