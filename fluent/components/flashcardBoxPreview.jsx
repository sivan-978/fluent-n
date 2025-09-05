import Link from "next/link";


function flashcardBoxPreview() {
    const data = [
        { title: 'The daily words', level: "A1", language: "Spanish", lastView: "2d", cards: "14", completed: "70%" },
        { title: 'The basic words', level: "A1", language: "Spanish", lastView: "8d", cards: "24", completed: "90%" },
        { title: 'The school words', level: "A1", language: "Spanish", lastView: "1d", cards: "17", completed: "60%" },
    ]

    return (
        <div className='flex gap-5 flex-nowrap overflow-hidden'>
            {data.map((box, i) => (

                <Link
                    key={i}
                    href='#'
                    className='bg-slate-500 flex flex-col gap-6 max-w-[360px] min-w-[360px] w-[360px] max-h-72 h-72 min-h-72 rounded-xl overflow-hidden shadow-[inset_0px_0px_14px_rgba(0,0,0,1)] bg-cover bg-top hover:shadow-[inset_0px_0px_49px_rgba(0,0,0,1)] transition-shadow'
                    style={{ backgroundImage: `url(${"/icons/boxBg.jpg"})` }}
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
                            <span>{box.cards} cards</span>
                            <span>Last reviewed {box.lastView} ago</span>
                        </div>

                        <div className='bg-blue-500 text-center'>
                            <p style={{ width: box.completed }} className='bg-blue-700 rounded-lg px-2 text-gray-200 '>{box.completed} completed</p>
                        </div>
                    </div>

                </Link>

            ))}
        </div>
    )
}
export default flashcardBoxPreview