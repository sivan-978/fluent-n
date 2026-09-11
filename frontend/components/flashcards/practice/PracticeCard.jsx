

export default function PracticeCard({ term, definition, showAnswer, onShowAnswer }) {
    
    return (
        <div className="w-full flex flex-col items-center gap-6">

            {/* card */}
            <div className="w-full min-h-[400px] rounded-3xl bg-white border-2 border-[#fc6b03]/60 shadow-2xl flex items-center justify-center p-12">
                <div className="text-center">
                    <p className="text-5xl font-bold text-[#965c09] break-words">
                        {term}
                    </p>

                    {showAnswer && (
                        <p className="mt-8 text-4xl font-semibold text-[#965c09]/70 break-words">
                            {definition}
                        </p>
                    )}
                </div>
            </div>


            {/* show answer */}
            {!showAnswer && (
                <button
                    onClick={onShowAnswer}
                    className="px-8 py-3 rounded-xl bg-[#965c09] text-white font-semibold hover:bg-[#7d4d08] cursor-pointer transition-all"
                >
                    Show answer
                </button>
            )}

        </div>
    );
}
