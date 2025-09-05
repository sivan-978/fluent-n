import Link from "next/link";

function bestCreatorBoxPreview() {
    const data = [
        { name: "Alex324", cardsets: "123", folders: "6" },
        { name: "Sinaboy09", cardsets: "114", folders: "8" },
        { name: "John76", cardsets: "98", folders: "4" },
    ]
    return (
        <div className='flex gap-5 flex-nowrap overflow-hidden'>
            {data.map((data, i) => (

                <Link
                    key={i}
                    href="#"
                    className='grid grid-cols-1 bg-gray-500 max-w-[360px] min-w-[360px] w-[360px] max-h-52 h-52 min-h-52 rounded-xl overflow-hidden border-white border-2 hover:shadow-[inset_0px_0px_12px_rgba(0,0,0,0.6)] transition-shadow'
                >
                    <div className='flex justify-between'>
                        <span className='font-bold text-2xl px-4 py-2'>{data.name}</span>
                        <button className='px-3 py-1 bg-slate-200  rounded-bl-lg hover:bg-slate-400'>
                            <img className='h-5 w-5' src="/icons/add.png" alt="Add" />
                        </button>
                    </div>

                    <div className=' justify-center flex items-center overflow-hidden'>
                        <img className='h-full rounded-full object-center' src="/icons/profile.png" alt="Profiel" />
                    </div>

                    <div className='flex justify-between py-2 px-4 font-medium text-base'>
                        <span>{data.cardsets} flashcard sets</span>
                        <span>{data.folders} folders</span>
                    </div>
                </Link>

            ))}
        </div>
    )

}
export default bestCreatorBoxPreview