"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function LanguagePicker({ label, value, onChange, languages, excludeCode = null }) {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const selected = languages.find((l) => l.code === value);
        setInputValue(selected?.label || "");
    }, [value, languages]);

    const filteredLanguages = languages.filter(
        (lang) =>
        lang.code !== excludeCode &&
        lang.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="relative w-full z-50">
            <label className="block text-[#fc6b03] font-bold mb-2 text-sm">
                {label}
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsOpen(true);
                    }}
                    placeholder={`Select ${label.toLowerCase()}`}
                    className="w-full px-6 py-4 bg-white border-2 border-[#fc6b03]/20 rounded-2xl outline-none focus:border-[#fc6b03] text-[#965c09] font-medium"
                />

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="absolute inset-y-0 right-4 flex items-center"
                >
                    <ChevronDown className="w-5 h-5 text-[#965c09]" />
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 z-[9999] mt-2 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-xl border border-[#fc6b03]/10">
                    {filteredLanguages.length > 0 ? (
                        filteredLanguages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => {
                                onChange(lang.code);
                                setInputValue(lang.label);
                                setIsOpen(false);
                                }}
                                className="cursor-pointer px-4 py-3 text-[#965c09] hover:bg-[#fff3e3]"
                            >
                                {lang.label}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-[#965c09]/60">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
