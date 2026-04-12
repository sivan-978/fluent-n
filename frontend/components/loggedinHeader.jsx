"use client";
import Link from "next/link";
import { useSidebar } from "@/app/_providers/sidebarProvider.jsx";
import { Flame, Bell} from 'lucide-react';



export default function loggedinHeader() {
    const { toggle } = useSidebar();

    return (
        <header className="bg-[#f8f3ef] max-w-7xl min-w-full flex items-center justify-between pr-6 h-20 border-b border-[#fc6b03]/10">

                
            <div className="flex items-center gap-4 pl-10">
                <img src="/icons/menu.png" alt="menu" className='h-8 cursor-pointer' onClick={toggle} />

                <div className="w-10 h-10 bg-[#fc6b03] rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                    <span className="text-white font-black text-xl">
                        <Link href="/dashboard" className="flex items-center">
                            <img src="/icons/logo.jpg" alt="logo" className='h-10 w-11 rounded-full' />
                        </Link>
                    </span>
                </div>
                <span className="text-2xl font-black text-[#965c09] tracking-tight">Fluent</span>
            </div>


            <div className="flex items-center gap-6 pr-16">

                <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-[#fff5e6] rounded-full border border-[#fc6b03]/10">
                    <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#fc6b03] fill-[#fc6b03]" />
                        <span className="font-black text-[#965c09]">7 Days</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-[#965c09]/60 hover:text-[#fc6b03] transition-colors relative cursor-pointer">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#fc6b03] border-2 border-white rounded-full"></span>
                    </button>

                    <div className="w-10 h-10 rounded-full border-2 border-[#fc6b03]/20 p-0.5 overflow-hidden">
                        <div className="w-full h-full rounded-full bg-[#965c09] flex items-center justify-center text-white font-bold">
                            0
                        </div>
                    </div>
                </div>

            </div>

        </header>
    )
}