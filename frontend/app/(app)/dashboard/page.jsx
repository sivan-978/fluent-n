"use client";

import LoggedinHeader from "@/components/loggedinHeader.jsx"
import SideNav from "@/components/sideNav.jsx"
import ImageWithFallback from "@/components/ImageWithFallback.tsx"
import { SidebarProvider } from "@/app/_providers/sidebarProvider";

import { removeToken } from "@/lib/token"
import { useRouter } from "next/navigation"

import Link from "next/link";
import { Plus, Play, MessageSquare, BookOpen, Trophy, Flame, Target, Sparkles, ArrowRight, Clock, Globe, Settings, Bell } from 'lucide-react';




export default function Dashboard(userName = "Alex") {
    const router = useRouter()

    function handleLogout() {
        removeToken()
        router.push("/login")
    }


    const recentSets = [
        { id: '1', title: 'Spanish Basics', progress: 65, color: 'from-[#fc6b03] to-[#ff9d5c]' },
        { id: '2', title: 'Travel Phrases', progress: 30, color: 'from-[#965c09] to-[#c48e42]' },
    ];


    return (
        <SidebarProvider defaultOpen={false}>
            <div className='flex flex-col h-screen min-h-screen bg-[#fff5e6]'>
                <header className='flex-shrink-0'>
                    <LoggedinHeader />
                </header>

                <div className='flex flex-1 overflow-hidden'>
                    <aside className='flex-shrink-0 h-full'>
                        <SideNav />
                    </aside>

                    <main className=' grid grid-cols-1 flex-1 overflow-auto px-24 py-10 gap-10'>

                        {/* Welcome Section */}
                        <div className="grid grid-cols-[2fr_1fr] items-start gap-8">
                            {/* welcoming*/}
                            <div className="flex items-center gap-8 px-10 py-10 bg-gradient-to-br from-[#fc6b03] to-[#965c09] rounded-[3rem] relative z-10">

                                <div className="text-left">
                                    <h1 className="text-5xl font-black mb-4 leading-tight">
                                        Hola, Alex! 👋
                                    </h1>
                                    <p className="text-white/80 text-lg font-medium mb-8 max-w-md">
                                        You're doing great! You studied 45 new words yesterday. Ready to keep the momentum going?
                                    </p>
                                    <button 
                                        className="bg-white text-[#fc6b03] px-8 py-4 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 mx-0"
                                    >
                                        Continue Studying
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                <div className="w-64 h-64 relative shrink-0">
                                    <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                                    <ImageWithFallback 
                                        src="https://images.unsplash.com/photo-1672601077647-940a3e3d5983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
                                        alt="Learning Mascot"
                                        className="w-full h-full object-cover rounded-[2rem] shadow-2xl rotate-3"
                                    />
                                </div>
                            </div>

                            {/* Daily Goal Card */}
                            <div className="flex flex-col max-w-96 bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-[#fc6b03]/5 justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-black text-[#965c09]">Today's Goal</h3>
                                        <Target className="w-6 h-6 text-[#fc6b03]" />
                                    </div>

                                    <div className="flex items-center justify-center py-4">
                                        <div className="relative w-32 h-32">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-[#fff5e6]" />
                                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * (1 - 0.75)} strokeLinecap="round" className="text-[#fc6b03]" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-black text-[#965c09]">75%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-center text-[#965c09]/60 font-bold mt-4">15/20 Cards Mastered</p>
                                </div>

                                <button className="w-full py-3 bg-[#fff5e6] text-[#965c09] font-black rounded-xl hover:bg-[#ffe8cc] transition-colors">
                                    Edit Goal
                                </button>
                            </div>
                        </div>


                        {/* actions & info */}
                        <div className="flex gap-5 items-start">

                            {/* Quick actions & Recent sets */}
                            <div className="grid gap-8 flex-1 px-1 py-1 inset-shadow-sm rounded-b-[45px] rounded-t-3xl">

                                {/* quick actions */}
                                <div className="grid ">
                                    <h2 className="text-2xl font-black text-[#965c09] mb-6 flex items-center gap-3">
                                        <Sparkles className="w-6 h-6 text-[#fc6b03]" /> Quick Actions
                                    </h2>

                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <Link 
                                            href='/flashcard-sets/create'
                                            className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-[#fc6b03]/10 hover:border-[#fc6b03] hover:-translate-y-1 transition-all group text-left"
                                        >

                                            <div className="w-14 h-14 bg-[#fff5e6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Plus className="w-8 h-8 text-[#fc6b03]" />
                                            </div>
                                            
                                            <h3 className="text-xl font-black text-[#965c09] mb-2">Create New Set</h3>
                                            <p className="text-[#965c09]/50 font-medium">Add your own words</p>
                                        </Link>

                                        <button 
                                            className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-[#fc6b03]/10 hover:border-[#fc6b03] hover:-translate-y-1 transition-all group text-left"
                                        >

                                            <div className="w-14 h-14 bg-[#fff5e6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <MessageSquare className="w-8 h-8 text-[#fc6b03]" />
                                            </div>
                                            <h3 className="text-xl font-black text-[#965c09] mb-2">AI Tutor Chat</h3>
                                            <p className="text-[#965c09]/50 font-medium">Practice conversation</p>
                                        </button>

                                        <button 
                                            className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-[#fc6b03]/10 hover:border-[#fc6b03] hover:-translate-y-1 transition-all group text-left"
                                        >
                                            <div className="w-14 h-14 bg-[#fff5e6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Globe className="w-8 h-8 text-[#fc6b03]" />
                                            </div>
                                            <h3 className="text-xl font-black text-[#965c09] mb-2">Explore Sets</h3>
                                            <p className="text-[#965c09]/50 font-medium">Find community cards</p>
                                        </button>
                                    </div>
                                </div>


                                {/* Recent Progress */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-black text-[#965c09] flex items-center gap-3">
                                            <Clock className="w-6 h-6 text-[#fc6b03]" /> Pick up where you left off
                                        </h2>

                                        <Link href='/library/flashcard-sets' className="text-[#fc6b03] font-black hover:underline">View All</Link>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {recentSets.map((set) => (
                                            <div key={set.id} className="bg-white p-6 rounded-[2.5rem] shadow-xl border-2 border-[#fc6b03]/5 flex items-center gap-6 group hover:border-[#fc6b03]/30 transition-all">
                                                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${set.color} shrink-0 flex items-center justify-center text-white shadow-lg`}>
                                                    <BookOpen className="w-10 h-10" />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-xl font-black text-[#965c09] mb-2">{set.title}</h3>
                                                    <div className="w-full h-3 bg-[#fff5e6] rounded-full overflow-hidden mb-2">
                                                        <div className="h-full bg-[#fc6b03]" style={{ width: `${set.progress}%` }}></div>
                                                    </div>
                                                    <div className="flex justify-between text-xs font-bold text-[#965c09]/40">
                                                        <span>{set.progress}% Complete</span>
                                                        <span>45 Cards Left</span>
                                                    </div>
                                                </div>

                                                <button 
                                                    className="p-3 bg-[#fc6b03] text-white rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <Play className="w-6 h-6 fill-current" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>


                            {/* info */}
                            <div className="grid gap-6 min-w-[300px] max-w-[300px] rounded-[45px] px-1 py-1">

                                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-[#fc6b03]/5">
                                    <h3 className="text-xl font-black text-[#965c09] mb-6 flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" /> Leaderboard
                                    </h3>

                                    <div className="space-y-6">
                                        {[
                                            { name: "mimo", xp: "2,450", avatar: "S" },
                                            { name: "You", xp: "1,890", avatar: "A", active: true },
                                            { name: "Tom M.", xp: "1,620", avatar: "T" },
                                            ].map((user, i) => (
                                            <div key={i} className={`flex items-center gap-4 ${user.active ? 'bg-[#fff5e6] p-3 -mx-3 rounded-2xl' : ''}`}>
                                                <span className="font-black text-[#965c09]/30 w-4">{i + 1}</span>
                                                <div className="w-10 h-10 rounded-full bg-[#fc6b03]/10 flex items-center justify-center font-bold text-[#fc6b03]">
                                                {user.avatar}
                                                </div>
                                                <div className="flex-1">
                                                <div className={`font-bold ${user.active ? 'text-[#fc6b03]' : 'text-[#965c09]'}`}>{user.name}</div>
                                                <div className="text-xs font-medium text-[#965c09]/40">{user.xp} XP</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-8 py-3 text-[#fc6b03] font-black text-sm hover:underline">See full rankings</button>
                                </div>

                                <div className="bg-gradient-to-br from-[#965c09] to-[#7a4b07] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-black mb-2">Pro Tip! 💡</h3>
                                        <p className="text-white/80 font-medium text-sm leading-relaxed mb-6">
                                            Studies show that 15 minutes of practice right before bed helps with long-term memory!
                                        </p>

                                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/50">
                                            <Settings className="w-4 h-4" /> Reminder set for 9:00 PM
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
                                </div>

                            </div>
                        </div>



                        {/* buttons */}
                        <div className="">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full cursor-pointer mr-5"
                            >
                                Logout
                            </button>
                        </div>

                    </main>

                </div>
            </div>
        </SidebarProvider>
    )
}