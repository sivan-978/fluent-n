"use client";
import Link from "next/link";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const FeatureCard = ({ title, description, icon, imageUrl, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#fc6b03]/10 hover:border-[#fc6b03]/30 transition-all group"
        >
            <div className="mb-6 relative h-48 overflow-hidden rounded-2xl border-2 border-[#ffe8cc]">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#965c09]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 p-3 bg-white rounded-xl shadow-lg">
                    {icon}
                </div>
            </div>

            <h3 className="text-2xl font-bold text-[#965c09] mb-3 flex items-center gap-2">
                {title}
            </h3>

            <p className="text-[#965c09]/70 leading-relaxed mb-6">
                {description}
            </p>

            <Link href="#">
                 <button className="flex items-center gap-2 font-bold text-[#fc6b03] hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                </button>
            </Link>
        </motion.div>
    );
};

export default FeatureCard;
