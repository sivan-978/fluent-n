"use client";

import { motion } from "motion/react";
import { Sparkles, Globe, Star } from "lucide-react";

export default function AuthBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-[#fc6b03]/10 rounded-full blur-3xl"
            />

            <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#965c09]/10 rounded-full blur-3xl"
            />

            {/* Floating icons */}
            <div className="absolute top-[10%] left-[5%] opacity-20">
                <Globe className="w-16 h-16 text-[#fc6b03]" />
            </div>

            <div className="absolute bottom-[20%] right-[10%] opacity-20">
                <Star className="w-12 h-12 text-[#965c09]" />
            </div>

            <div className="absolute top-[11%] right-[8%] opacity-15">
                <Sparkles className="w-14 h-14 text-[#fc6b03]" />
            </div>

            <div className="absolute bottom-[31%] left-[10%] opacity-15">
                <Sparkles className="w-14 h-14 text-[#fc6b03]" />
            </div>
        </div>
    );
}