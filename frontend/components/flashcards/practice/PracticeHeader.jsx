import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";



export default function PracticeHeader({ title, description }) {
    return (
        <header className="relative flex items-center justify-center w-full min-w-0">

            {/* exit */}
            <Link
                href="/library/flashcard-sets"
                className="absolute left-0 flex gap-1.5 items-center px-4 py-2 text-xl font-medium text-[#965c09] rounded-2xl border-2 border-[#fc6b03]/30 bg-[#fff5e6] hover:bg-[#fef0dd]"
            >
                <ArrowLeft className="w-5 h-5" />
                Exit
            </Link>


            {/* set information */}
            <div className="flex flex-col items-center">
                <h1 className="text-[28px] font-bold text-[#965c09]">
                    {title}
                </h1>

                <h3 className="text-xl text-[#965c09] font-medium text-center break-words">
                    {description}
                </h3>
            </div>


            {/* practice mode */}
            <div className="absolute right-0 flex gap-2 items-center px-4 py-1.5 text-lg font-medium text-[#965c09] rounded-full border-2 border-[#fc6b03]/20 bg-[#fff5e6]/70">
                <BookOpen className="w-5 h-5" />
                Practice mode
            </div>

        </header>
    );
}