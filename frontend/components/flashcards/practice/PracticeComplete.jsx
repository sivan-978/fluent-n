


export default function PracticeComplete({ completedCards, totalCards, onPracticeAgain, onBackToSet }) {

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
            <div className="w-full rounded-3xl bg-white border-2 border-[#fc6b03]/40 shadow-2xl p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-5xl">🎉</div>

                    <h2 className="text-3xl font-bold text-[#965c09]">
                        Practice complete!
                    </h2>

                    <p className="text-lg text-[#965c09]/70">
                        You completed {completedCards} of {totalCards} cards.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onPracticeAgain}
                    className="px-6 py-3 rounded-xl bg-[#965c09] text-white font-semibold hover:bg-[#7d4d08] transition-all cursor-pointer"
                >
                    Practice again
                </button>

                <button
                    type="button"
                    onClick={onBackToSet}
                    className="px-6 py-3 rounded-xl bg-white text-[#965c09] border-2 border-[#965c09]/20 font-semibold hover:bg-[#fff5e6] transition-all cursor-pointer"
                >
                    Back to flashcard sets
                </button>
            </div>
        </div>
    );
}
