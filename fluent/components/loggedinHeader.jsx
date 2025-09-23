"use client";
import Link from "next/link";
import { useSidebar } from "@/app/_providers/sidebarProvider.jsx";


export default function loggedinHeader() {
    const { toggle } = useSidebar();

    return (
        <header className="bg-slate-600 flex items-center py-5">

            <div className='flex items-center pl-7 gap-3 w-56'>
                <img src="/icons/menu.png" alt="menu" className='h-8 cursor-pointer' onClick={toggle} />
                <Link href="/home" className="flex items-center">
                    <img src="/icons/logo.jpg" alt="logo" className='h-14 w-15 rounded-full px-1' />
                </Link>
            </div>

            <div className='flex flex-1 justify-center'>
                <div className='relative w-3/5'>
                    <label htmlFor="header-search" className="sr-only">
                        Search Fluentsets
                    </label>
                    <input placeholder='Search.....' type="text" className='rounded-3xl w-full pr-4 pl-10 py-2 bg-gray-50 text-gray-900' />
                    <img src="/icons/search.png" alt="search" className='absolute left-3 top-1/2 transform -translate-y-1/2 h-6' />
                </div>
            </div>

            <div className='flex gap-5 w-56 justify-center'>
                <img src="/icons/create.png" alt="add" className='h-10' />
                <div className='bg-white rounded-full h-11 w-11'>

                </div>
            </div>

        </header>
    )
}