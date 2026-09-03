"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Sparkles, Globe, Lightbulb, Star, Zap, MessageSquare, PlusCircle, Layout, ChevronRight } from 'lucide-react';
import { motion } from "motion/react";

import FeatureCard from "@/components/featureCard"
import Header from "@/components/layout/header"




export default function Home() {
    return (
        <div className="min-h-screen bg-[#fff5e6] relative overflow-hidden font-sans">
            <Header />

            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-[#fc6b03]/5 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-20 w-80 h-80 bg-[#965c09]/5 rounded-full blur-3xl"
                />
                <div className="absolute top-20 right-[10%] opacity-20">
                    <Globe className="w-24 h-24 text-[#fc6b03]" />
                </div>

                <div className="absolute top-[32%] left-[20%] opacity-10">
                    <Star className="w-12 h-12 text-[#fc6b03]" />
                </div>

                <div className="absolute bottom-[169px] left-[5%] opacity-20">
                    <BookOpen className="w-20 h-20 text-[#965c09]" />
                </div>

                <div className="absolute bottom-20 right-[15%] opacity-15">
                    <Sparkles className="w-16 h-16 text-[#fc6b03]" />
                </div>
            </div>
            

            {/* Hero Section */}
            <section className="relative pt-16 pb-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffe8cc] rounded-full text-[#965c09] font-bold text-sm mb-6 border border-[#fc6b03]/20">
                            <Sparkles className="w-4 h-4 text-[#fc6b03]" />
                            The #1 platform for custom flashcards
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-[#965c09] leading-[1.1] mb-8">
                            Master any language <br />
                            <span className="text-[#fc6b03]">with joy.</span>
                        </h1>
                        <p className="text-xl text-[#965c09]/70 leading-relaxed mb-10 max-w-xl">
                            Build your own study sets, practice with smart flip cards, and chat with your AI tutor to reach fluency faster than ever. Warm, friendly, and actually fun.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="#">
                                <button 
                                    className="px-10 py-5 bg-gradient-to-r from-[#fc6b03] to-[#965c09] text-white text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center gap-3 group"
                                >
                                    Create Your First Set
                                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            
                            <Link href="#">
                                <button className="px-10 py-5 bg-white border-2 border-[#fc6b03]/20 text-[#965c09] text-lg font-black rounded-2xl hover:bg-[#ffe8cc] transition-all">
                                    See How It Works
                                </button>
                            </Link>
                        </div>
                        
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#fff5e6] overflow-hidden bg-white shadow-md">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                                ))}
                            </div>
                            <p className="text-[#965c09]/60 font-medium">
                                Joined by <span className="text-[#965c09] font-bold">12,000+</span> language lovers
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-white rounded-[2.5rem] p-4 shadow-2xl border-2 border-[#fc6b03]/20 transform rotate-2">
                            <img
                                src="https://images.unsplash.com/photo-1753939582692-6b01009b9cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwYXBwJTIwc3R1ZGVudCUyMHN0dWR5aW5nJTIwb3JhbmdlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk1MDIwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Student studying"
                                className="rounded-[2rem] w-full aspect-[4/3] object-cover"
                            />
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 bg-[#ffe8cc] p-6 rounded-3xl shadow-xl border-2 border-[#fc6b03]/30"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-[#fc6b03] rounded-lg flex items-center justify-center">
                                        <Zap className="text-white w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-[#965c09]">Daily Streak</span>
                                </div>
                                <div className="text-2xl font-black text-[#fc6b03]">14 Days 🔥</div>
                            </motion.div>
                            
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-10 bg-white p-5 rounded-2xl shadow-xl border-2 border-[#fc6b03]/20 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Star className="text-green-600 w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[#965c09]">Fluency Goal</div>
                                    <div className="w-32 h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                        <div className="w-[75%] h-full bg-green-500 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Feature Preview Section */}
            <section className="py-24 px-6 bg-white/50 backdrop-blur-sm relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-[#965c09] mb-4">Everything you need to succeed.</h2>
                        <p className="text-xl text-[#965c09]/70 max-w-2xl mx-auto">
                            We've combined classic study methods with modern technology to make your learning journey smoother.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            index={0}
                            title="Smart Set Creator"
                            description="Easily add words, definitions, and examples. Import lists or use our auto-suggest feature for quick set building."
                            icon={<PlusCircle className="w-6 h-6 text-[#fc6b03]" />}
                            imageUrl="https://images.unsplash.com/photo-1620714223589-a0ad3b4aaac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFzaGNhcmRzJTIwbGVhcm5pbmclMjBjb2xvcmZ1bCUyMGZyaWVuZGx5fGVufDF8fHx8MTc2OTUwMjAzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        />
                        <FeatureCard
                            index={1}
                            title="Interactive Practice"
                            description="Learn through flip cards, multiple-choice quizzes, and writing exercises. Our algorithm prioritizes what you find hardest."
                            icon={<Layout className="w-6 h-6 text-[#fc6b03]" />}
                            imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsZWFybmluZyUyMGZsYXNoY2FyZHN8ZW58MHx8fHwxNzY5NTAyMDM2fDA&ixlib=rb-4.1.0&q=80&w=1000"
                        />
                        <FeatureCard
                            index={2}
                            title="AI Conversational Tutor"
                            description="Practice speaking and writing with our friendly AI. Get instant corrections and explanations for your mistakes."
                            icon={<MessageSquare className="w-6 h-6 text-[#fc6b03]" />}
                            imageUrl="https://images.unsplash.com/photo-1557800634-7bf3c7305596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHR1dG9yJTIwY2hhdCUyMGludGVyZmFjZSUyMGZyaWVuZGx5JTIwb3JhbmdlfGVufDF8fHx8MTc2OTUwMjA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        />
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#fc6b03] to-[#965c09] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-10 left-10"><Globe className="w-32 h-32" /></div>
                        <div className="absolute bottom-10 right-10"><Lightbulb className="w-32 h-32" /></div>
                    </div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to spark your <br />language journey?</h2>
                        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                            Join thousands of learners who are mastering new languages with our playful and effective flashcard system.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/signup">
                                <button 
                                    className="px-12 py-5 bg-white text-[#fc6b03] text-xl font-black rounded-2xl hover:bg-[#fff5e6] transition-all shadow-xl"
                                >
                                    Sign Up for Free
                                </button>
                            </Link>

                            <Link href="#">
                                <button className="px-12 py-5 bg-transparent border-2 border-white/30 text-white text-xl font-black rounded-2xl hover:bg-white/10 transition-all">
                                    View All Courses
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="py-12 px-6 border-t border-[#fc6b03]/10 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#b57140] rounded-lg flex items-center justify-center shadow-lg">
                        <img className='rounded-full' src="/icons/graduation.png" alt="Fluent logo"/>
                    </div>
                    <span className="text-xl font-black text-[#965c09] tracking-tight">Fluent</span>
                </div>
                <p className="text-[#965c09]/50 font-medium">© 2026 Fluent. Designed with ❤️ for language learners.</p>
            </footer>

        </div>
    );
}
