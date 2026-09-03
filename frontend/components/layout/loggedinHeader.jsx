"use client";
import Link from "next/link";
import { useSidebar } from "@/app/_providers/sidebarProvider.jsx";
import { Flame, Bell, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import { removeToken } from "@/lib/token"
import {currentUser} from "@/lib/api.ts"
import { useRouter } from "next/navigation"



export default function loggedinHeader() {
    const { toggle } = useSidebar();
    const [profileOpen, setProfileOpen] = useState(false);

    // to close the profile dropdown when clicked anywhere on screen
    const profileRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const router = useRouter()
    function handleLogout() {
        removeToken()
        router.push("/login")
    }

    
    const [user, setUser] = useState(null);
    useEffect(() => {
        currentUser()
            .then(setUser)
            .catch(console.error);
    }, []);

    


    return (
        <header className="flex items-center justify-between max-w-7xl min-w-full px-14 py-4 bg-[#FFF8F0] border-b border-[#965C09]/10">

                
            <div className="flex items-center gap-4">
                <img src="/icons/menu.png" alt="menu" className='h-8 cursor-pointer' onClick={toggle} />

                <Link href="/dashboard" className="flex items-center gap-2">
                    <img 
                        src="/icons/logo.png" 
                        alt="logo" 
                        className='h-10 w-11 shadow-lg rounded-full transform -rotate-6' 
                    />
                    <span className="text-2xl font-black text-[#965c09] tracking-tight">Fluent</span>
                </Link>
            </div>


            <div className="flex items-center gap-6">

                <div className="md:flex hidden items-center gap-2 px-4 py-2 bg-[#fff5e6] rounded-full border border-[#fc6b03]/10">
                    <Flame className="w-5 h-5 text-[#fc6b03] fill-[#fc6b03]" />
                    <span className="font-black text-[#965c09]">7 Days</span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-[#965c09]/60 hover:text-[#fc6b03] transition-colors relative cursor-pointer">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#fc6b03] border-2 border-white rounded-full"></span>
                    </button>


                    {/*profile icon and dropdown*/}
                    <div ref={profileRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setProfileOpen((prev) => !prev)}
                            className="w-10 h-10 rounded-full border-2 border-[#fc6b03]/25 p-0.5 overflow-hidden cursor-pointer"
                        >
                            <div className="w-full h-full rounded-full bg-[#965c09] flex items-center justify-center text-white font-bold">
                                0
                            </div>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-12 w-64 bg-[#fff8f0] border border-[#965c09]/10 rounded-2xl shadow-xl p-4 z-[200]">
                                
                                <div className="pb-3 border-b border-[#965c09]/10">
                                    <p className="font-bold text-[#965c09]">
                                        {user?.username}
                                    </p>

                                    <p className="text-sm text-[#965c09]/60 mt-1">
                                        {user?.email}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="w-full flex items-center gap-3 mt-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-semibold"> Log out </span>
                                </button>

                            </div>
                        )}
                    </div>
                </div>

            </div>

        </header>
    )
}
