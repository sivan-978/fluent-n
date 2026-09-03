"use client";

import { Star } from "lucide-react";
import LanguagePicker from "@/components/LanguagePicker";



export default function FlashcardSetDetails({
    title, setTitle,
    description, setDescription,
    level, setLevel,
    languages,
    sourceLanguage, setSourceLanguage,
    targetLanguage, setTargetLanguage,
    submitted,
}) {

    return (

        <div className="flex flex-col gap-3 p-10 relative z-50 bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-2xl border-2 border-[#fc6b03]/10">
            
            <div className="absolute top-4 right-4 text-[#fc6b03]/30">
                <Star className="w-6 h-6" />
            </div>


            {/* Title */}
            <div className="w-full">
                <label className="block text-[#965c09] font-bold mb-2 text-sm">
                    Title <span className="text-[#fc6b03]">*</span>
                </label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={`${submitted && !title.trim() ? "Please enter a Title to create the set." : "Enter a title, like 'Spanish Vocabulary - Chapter 3' 📚"}`}
                    className={`w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] transition-colors text-[#965c09] placeholder:text-[#965c09]/40 ${submitted && !title.trim() ? "border-red-500 border-2 placeholder-gray-900 placeholder:font-medium" : ""}`}
                />
            </div>


            {/* Description */}
            <div className="w-full">
                <label className="block text-[#965c09] font-bold mb-2 text-sm">
                    Description (optional)
                </label>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description to help you remember what this set is about 💡"
                    rows={3}
                    className="w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] transition-colors text-[#965c09] placeholder:text-[#965c09]/40 resize-none"
                />
            </div>


            {/* Language selectors */}
            <div className="flex gap-6">
                <LanguagePicker

                    label="Source Language"
                    value={sourceLanguage}
                    onChange={setSourceLanguage}
                    languages={languages}
                />

                <LanguagePicker
                    label="Target Language"
                    value={targetLanguage}
                    onChange={setTargetLanguage}
                    languages={languages}
                    excludeCode={sourceLanguage}
                />
            </div>


            {/* flashcard set level*/}
            <div>
                <label className="block text-[#965c09] font-bold mb-2 text-sm">
                    Flashcard set level (optional)
                </label>

                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] text-[#965c09] font-medium"
                >
                    <option value="">Select level</option>
                    <option value="A1">A1 - Beginner</option>
                    <option value="A2">A2 - Elementary</option>
                    <option value="B1">B1 - Intermediate</option>
                    <option value="B2">B2 - Upper Intermediate</option>
                    <option value="C1">C1 - Advanced</option>
                    <option value="C2">C2 - Proficient</option>
                </select>
            </div>

        </div>
    );
}
