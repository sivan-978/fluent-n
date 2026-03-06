"use client";

import { useState } from "react";
import { Mail, Lock, ArrowLeft, GraduationCap, Sparkles, Star, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginUser } from "@/lib/auth";
import { saveToken } from "@/lib/token";


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const data = await loginUser(email, password);

            // store JWT token
            saveToken(data.access_token);

            // redirect after login
            window.location.href = "/dashboard";

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-2 border-[#fc6b03]/10 relative z-10">

            {/* Left Side */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#fc6b03] to-[#965c09] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-6 gap-8 p-12">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <Star key={i} className="w-8 h-8 rotate-12" />
                        ))}
                    </div>
                </div>

                <div className="relative z-10">

                    <div className="flex items-center gap-1 text-gray-200 hover:text-white mb-10">
                        <ArrowLeft className="w-5 h-5" />
                        <Link href='/' className="font-semibold " >Back to home</Link>
                    </div>
                        
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                            <GraduationCap className="text-[#fc6b03] w-8 h-8" />
                        </div>
                        <span className="text-3xl font-black tracking-tight">Fluent</span>
                    </div>

                    <h2 className="text-5xl font-black mb-6 leading-tight">
                        Welcome back, learner!
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-md">
                        Your flashcards and AI tutor are waiting. Let's keep that streak alive!
                    </p>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#ffe8cc] rounded-full flex items-center justify-center shadow-inner">
                            <Sparkles className="text-[#fc6b03] w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-lg">Daily Tip</div>
                            <div className="text-white/70 text-sm italic">
                                "Consistency is the secret to fluency."
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="p-12 lg:p-20 flex flex-col justify-center">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-[#965c09] mb-3">
                        Sign In
                    </h1>
                    <p className="text-[#965c09]/60 font-medium">
                        Glad to see you again! Please enter your details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#965c09] uppercase tracking-wider ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#965c09]/40" />
                            <input
                                type="email"
                                required
                                placeholder="hello@lingospark.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#fff5e6] border-2 border-[#fc6b03]/10 focus:border-[#fc6b03] outline-none rounded-2xl py-4 pl-14 pr-6 font-bold text-[#965c09] placeholder:text-[#965c09]/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-bold text-[#965c09] uppercase tracking-wider">
                                Password
                            </label>
                            <button type="button" className="text-xs font-bold text-[#fc6b03] hover:underline">
                                Forgot Password?
                            </button>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#965c09]/40" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#fff5e6] border-2 border-[#fc6b03]/10 focus:border-[#fc6b03] outline-none rounded-2xl py-4 pl-14 pr-14 font-bold text-[#965c09] placeholder:text-[#965c09]/30 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#965c09]/40 hover:text-[#965c09]"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>


                    {error && (
                        <p className="text-red-500 text-sm font-medium">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-gradient-to-r from-[#fc6b03] to-[#965c09] text-white text-xl font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[#965c09]/60 font-medium">Don't have an account yet? <Link href='/signup' className="font-bold text-[#fc6b03] hover:underline">Create account</Link> </p>
                </div>
            </div>
        </div>
    );
}