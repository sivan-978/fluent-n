import Link from "next/link";

function popularCardsetsBoxPreview() {
    const data = [
        { name: "jony", language: "English", level: "A2", title: "Basic Words of the day and the night ", cards: "202" },
        { name: "koko la", language: "English", level: "A1", title: "House words", cards: "43" },
        { name: "Kolampo97", language: "English", level: "A2", title: "Words used at work", cards: "105" },
    ]

    return (
        <div className='flex gap-5 flex-nowrap overflow-hidden'>

            {data.map((data, i) => (

                <Link
                    key={i}
                    href="#"
                    className='flex flex-col py-1 gap-3 bg-slate-500 max-w-[360px] min-w-[360px] w-[360px] max-h-52 h-52 min-h-52 overflow-hidden rounded-xl bg-cover bg-center hover:shadow-[inset_0px_0px_22px_rgba(74,255,255,0.8)] transition-shadow'
                    style={{ backgroundImage: `url(${"/icons/popular-cardsets-cover.jpg"})` }}
                >

                    <div className='h-full flex justify-between gap-2 overflow-hidden'>
                        <div>
                            <p className='text-black font-bold px-3 py-1 text-2xl line-clamp-2 break-words leading-tight'>{data.title}</p>
                        </div>
                        <div className='text-black font-medium flex flex-col px-2 py-1 items-center font-base leading-tight'>
                            <span>{data.level}</span>
                            <span>{data.language}</span>
                        </div>
                    </div>

                    <div className='flex h-56 overflow-hidden items-start justify-center'>
                        <span className='text-white font-extrabold text-4xl' style={{ textShadow: ["0 0 12px rgba(0,0,0,1)", "0 2px 6px rgba(0,0,0,0.7)",].join(", ") }}
                        >{data.cards} Cards
                        </span>
                    </div>

                    <div className="flex h-20 gap-1 overflow-hidden items-center px-1" >
                        <img className='h-full rounded-full object-center' src="/icons/profile.png" alt="Profile" />
                        <p className='text-black text-xl font-medium'>{data.name}</p>
                    </div>

                </Link>
            ))}
        </div>
    )

}

export default popularCardsetsBoxPreview