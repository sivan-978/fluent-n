"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoggedinHeader from "@/components/loggedinHeader"
import SideNav from "@/components/sideNav"


function LibraryLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className='flex flex-col h-screen'>

            <header className='flex-shrink-0'>
                <LoggedinHeader />
            </header>

            <div className='flex flex-1 overflow-hidden'>

                <aside className='flex-shrink-0 bg-slate-700 h-full'>
                    <SideNav />
                </aside>

                <main className='bg-slate-800 flex flex-col  flex-1 overflow-auto px-8 py-5 gap-0'>
                    <div className="flex flex-col gap-16">
                        <div className="mt-10">
                            <h1 className="font-bold text-4xl">Your library</h1>
                        </div>

                        <div>
                            <div className="flex gap-9 border-b-2 border-gray-200 pb-2">
                                <Link href='/library/flashcard-sets' className={`font-bold underline-offset-[13.5px] decoration-[1.5px] decoration-cyan-500 ${pathname === "/library/flashcard-sets" ? 'underline text-white' : 'text-gray-500 hover:underline hover:decoration-cyan-700'}`}>
                                    Flashcard sets
                                </Link>

                                <Link href='/library/folders' className={`font-bold underline-offset-[13.5px] decoration-[1.5px] decoration-cyan-500 ${pathname === "/library/folders" ? 'underline text-white' : 'text-gray-500 hover:underline hover:decoration-cyan-700'}`}>
                                    Folders
                                </Link>
                            </div>

                        </div>
                    </div>


                    {children}

                </main>
            </div>
        </div>
    )
}

export default LibraryLayout