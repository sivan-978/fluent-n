"use client";

import Link from "next/link";


function flashcardBoxPreview({ items = [] }) {

    return (

        items.map((box) => (
            <div key={box.id} className="col-span-1">

                <Link
                    href={`/library/flashcard-sets/${box.id}`}
                    className='bg-slate-500 flex flex-col gap-6 max-w-[360px] min-w-[360px] w-[360px] max-h-72 h-72 min-h-72 rounded-xl overflow-hidden shadow-[inset_0px_0px_14px_rgba(0,0,0,1)] bg-cover bg-top hover:shadow-[inset_0px_0px_49px_rgba(0,0,0,1)] transition-shadow'
                    style={{ backgroundImage: `url(${box.bg})` }}
                >
                    <div className="h-full flex gap-1 overflow-hidden justify-between">
                        <p className="text-black font-bold text-2xl pt-3 px-3 overflow-hidden overflow-ellipsis break-words">
                            {box.title}
                        </p>

                        <div className="flex flex-col items-center pt-2 px-2 leading-tight">
                            <span className="text-black font-semibold">{box.level}</span>
                            <span className="text-black font-semibold">{box.language}</span>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-1'>
                        <div className='text-orange-800 font-semibold flex flex-col text-right px-2 leading-tight'>
                            <span>{box.cardsCount} cards</span>
                            <span>Last reviewed {box.lastView} </span>
                        </div>

                        <div className='bg-blue-500 text-center'>
                            <p style={{ width: box.completed }} className='bg-blue-700 rounded-lg px-2 text-gray-200 '>{box.completed} completed</p>
                        </div>
                    </div>

                </Link>
            </div>
        ))

    )
}
export default flashcardBoxPreview