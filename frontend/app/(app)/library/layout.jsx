"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoggedinHeader from "@/components/loggedinHeader"
import SideNav from "@/components/sideNav"
import { Plus, Globe, ExternalLink, MoreVertical, BookOpen, Sparkles, Star, Layers } from 'lucide-react';


function LibraryLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className='flex flex-col h-screen'>

            <header className='flex-shrink-0'>
                <LoggedinHeader />
            </header>

            <div className='flex flex-1 overflow-hidden'>

                <aside className='flex-shrink-0 h-full'>
                    <SideNav />
                </aside>

                <main className='flex flex-col flex-1 overflow-auto px-14 py-10 gap-0 bg-gradient-to-br from-[#ecceb7] via-[#ffeccf] to-[#fce1c6]'>

                    {children}

                </main>
            </div>
        </div>
    )
}

export default LibraryLayout