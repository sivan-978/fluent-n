"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Lock, GraduationCap, Sparkles, Star, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";


export default function SignupPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	};

	return (
		<div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-2 border-[#fc6b03]/10 relative z-10">

			{/* left side */}
			<div className="hidden lg:flex flex-col justify-between py-9 px-12 bg-gradient-to-br from-[#fc6b03] to-[#965c09] text-white relative overflow-hidden">
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
						<span className="text-4xl font-black tracking-tight"> Fluent </span>
					</div>

					<h2 className="text-5xl font-black mb-6 leading-tight">
						Start your journey today!
					</h2>
					<p className="text-xl text-white/90 leading-relaxed mb-8 max-w-md">
						Join thousands of students mastering new languages through fun and effective practice.
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

			{/* right side */}
			<div className="py-9 px-12 flex flex-col justify-center">
				<div className="mb-10">
					<h1 className="text-4xl font-black text-[#965c09] mb-3">
						Create Account
					</h1>
					<p className="text-[#965c09]/60 font-medium">
						Join the family and start learning for free.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">

					{/* full name */}
					<div className="space-y-2">
						<label className="text-sm font-bold text-[#965c09] uppercase tracking-wider ml-1">
							Full Name
						</label>
						<div className="relative group">
							<Star className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#965c09]/40" />
							<input
								type="text"
								required
								placeholder="Jane Doe"
								className="w-full bg-[#fff5e6] border-2 border-[#fc6b03]/10 focus:border-[#fc6b03] outline-none rounded-2xl py-4 pl-14 pr-6 font-bold text-[#965c09] placeholder:text-[#965c09]/30 transition-all"
							/>
						</div>
					</div>

					{/* email */}
					<div className="space-y-2">
						<label className="text-sm font-bold text-[#965c09] uppercase tracking-wider ml-1">
							Email Address
						</label>
						<div className="relative group">
							<Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#965c09]/40" />
							<input
								type="email"
								required
								placeholder="hello@fluent.com"
								className="w-full bg-[#fff5e6] border-2 border-[#fc6b03]/10 focus:border-[#fc6b03] outline-none rounded-2xl py-4 pl-14 pr-6 font-bold text-[#965c09] placeholder:text-[#965c09]/30 transition-all"
							/>
						</div>
					</div>

					{/* password */}
					<div className="space-y-2">
						<label className="text-sm font-bold text-[#965c09] uppercase tracking-wider ml-1">
							Password
						</label>

						<div className="relative group">
							<Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#965c09]/40" />
							<input
								type={showPassword ? "text" : "password"}
								required
								placeholder="••••••••"
								className="w-full bg-[#fff5e6] border-2 border-[#fc6b03]/10 focus:border-[#fc6b03] outline-none rounded-2xl py-4 pl-14 pr-14 font-bold text-[#965c09] placeholder:text-[#965c09]/30 transition-all"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-5 top-1/2 -translate-y-1/2 text-[#965c09]/40 hover:text-[#965c09]"
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5" />
								) : (
									<Eye className="w-5 h-5" />
								)}
							</button>
						</div>

						<p className="text-xs text-[#965c09]/50 ml-1 font-medium">
							Password must be at least 8 characters long.
						</p>
					</div>


					{/* submit */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-5 bg-gradient-to-r from-[#fc6b03] to-[#965c09] text-white text-xl font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
					>
						{isLoading ? (
							<div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
						) : (
							<>
								Get Started
								<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
							</>
						)}
					</button>
				</form>
				
				<div className="mt-10 text-center">
                    <p className="text-[#965c09]/60 font-medium">Already have an account? <Link href='/login' className="font-bold text-[#fc6b03] hover:underline">Sign in</Link> </p>
                </div>


				<div className="mt-10 pt-6 border-t border-[#fc6b03]/40 text-center">
					<p className="text-xs text-[#965c09]/40 font-medium leading-relaxed">
						By continuing, you agree to Fluent's <br className="hidden sm:block" />
						<Link href='/terms&service' className="underline">Terms of Service</Link> and <Link href='/privacy' className="underline">Privacy Policy</Link>.
					</p>
				</div>
			</div>
		</div>
	);
}