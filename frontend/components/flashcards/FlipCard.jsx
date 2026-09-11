import { Sparkles, Star } from 'lucide-react';


export default function FlipCard({ term, definition, flipped, onToggle }) {
    return (
        <div className="relative w-full h-full max-h-3/5 max-w-2xl [perspective:1000px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <Star className="absolute top-4 right-4 w-6 h-6 text-[#fc6b03]/50" />
                <Sparkles className="absolute bottom-4 left-4 w-6 h-6 text-[#fc6b03]/50" />
            </div>

            <button
                onClick={onToggle}
                className={`w-full h-full bg-gradient-to-br from-white to-[#fff5e6] rounded-3xl shadow-2xl border-2 border-[#fc6b03]/40 p-12 cursor-pointer transition-all hover:shadow-3xl relative
                    duration-300 [transform-style:preserve-3d]
                    ${flipped ? "[transform:rotateY(180deg)] ring-4 ring-[#fc6b03]/30" : ""}
                `}
            >
                <div
                    className="absolute inset-0 grid place-items-center p-6 text-2xl font-semibold w-full h-full min-w-0 text-center overflow-hidden
                     [backface-visibility:hidden]"
                >
                    <span className="text-5xl font-bold text-[#965c09] block w-full max-w-full whitespace-normal [overflow-wrap:anywhere] ">
                        {term || <span className="text-5xl font-bold text-[#965c09]">No term</span>}
                    </span>
                </div>

                <div
                    className="absolute inset-0 grid place-items-center p-6 text-2xl font-semibold
                     [transform:rotateY(180deg)] [backface-visibility:hidden]"
                >
                    <span className="text-5xl font-bold text-[#965c09] block w-full max-w-full whitespace-normal [overflow-wrap:anywhere] ">
                        {definition || <span className="text-[#965c09]">No definition</span>}
                    </span>
                </div>
            </button>

            <p className="mt-3 text-center text-[#965c09]/50 text-sm font-semibold">
                Click the card to flip
            </p>
        </div>
    );
}
