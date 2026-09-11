"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getSet } from "@/lib/api";
import PracticeHeader from "@/components/flashcards/practice/PracticeHeader";
import PracticeCard from "@/components/flashcards/practice/PracticeCard";
import PracticeControls from "@/components/flashcards/practice/PracticeControls";
import PracticeProgress from "@/components/flashcards/practice/PracticeProgress";
import PracticeComplete from "@/components/flashcards/practice/PracticeComplete";


export default function PracticePage() {
    const { id } = useParams();
    const router = useRouter();

    const [setData, setSetData] = useState(null);
    const [loading, setLoading] = useState(true);

    // practice state
    const [practiceQueue, setPracticeQueue] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [completedCards, setCompletedCards] = useState(0);
    const [totalCards, setTotalCards] = useState(0);

    const currentCard = practiceQueue[0];
    const isComplete = practiceQueue.length === 0;

    const [allCards, setAllCards] = useState([]);

    const handleGotIt = () => {
        setCompletedCards((prev) => prev + 1);
        setPracticeQueue((prev) => prev.slice(1));
        setShowAnswer(false);
    };


    const handleAgain = () => {
        setPracticeQueue((prev) => {
            const currentCard = prev[0];
            const remaining = prev.slice(1);

            return [...remaining, currentCard];
        });

        setShowAnswer(false);
    };

    const handlePracticeAgain = () => {
        setPracticeQueue(allCards);
        setCompletedCards(0);
        setShowAnswer(false);
    };

    const handleBackToSet = () => {
        router.push(`/library/flashcard-sets`);
    };
    

    useEffect(() => {
        async function loadSet() {
            try {
                setLoading(true);

                const data = await getSet(Number(id));

                const cards = (data.flashcards || []).map((card) => ({
                    id: card.id,
                    term: card.term,
                    definition: card.definition,
                }));

                setSetData({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                });

                setAllCards(cards);
                setPracticeQueue(cards);
                setTotalCards(cards.length);

            } catch (error) {
                console.error("Failed to load practice set:", error);
                setSetData(null);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadSet();
        }
    }, [id]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fff5e6]">
                <p className="text-[#965c09] text-xl font-semibold">
                    Loading practice...
                </p>
            </div>
        );
    }


    if (!setData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fff5e6]">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-2xl font-semibold text-[#965c09]">
                        Set not found.
                    </p>

                    <button
                        onClick={() => router.push("/library/flashcard-sets")}
                        className="px-5 py-2 rounded-xl bg-[#965c09] text-white hover:bg-[#7d4d08] cursor-pointer"
                    >
                        Back to library
                    </button>
                </div>
            </div>
        );
    }


    if (isComplete) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-[#fff5e6] via-[#ffe8cc] to-[#ffd9a8]">
                <div className="w-4/5 mx-auto min-h-screen flex flex-col py-8">

                    <PracticeHeader
                        title={setData.title}
                        description={setData.description}
                    />

                    <div className="flex-1 flex items-center justify-center">
                        <PracticeComplete
                            completedCards={completedCards}
                            totalCards={totalCards}
                            onPracticeAgain={handlePracticeAgain}
                            onBackToSet={handleBackToSet}
                        />
                    </div>

                </div>
            </main>
        );
    }



    return (
        <main className="min-h-screen bg-gradient-to-br from-[#fff5e6] via-[#ffe8cc] to-[#ffd9a8]">

            <div className="w-4/5 mx-auto flex flex-col items-center py-8 gap-18">

                {/* header */}
                <PracticeHeader
                    title={setData.title}
                    description={setData.description}
                />


                {/* practice content */}
                <div className="flex flex-col gap-6 w-full max-w-2xl">

                    <PracticeProgress
                        current={completedCards}
                        total={totalCards}
                    />

                    <div className="flex flex-col items-center gap-6">

                        <PracticeCard
                            term={currentCard?.term ?? ""}
                            definition={currentCard?.definition ?? ""}
                            showAnswer={showAnswer}
                            onShowAnswer={() => setShowAnswer(true)}
                        />

                        {showAnswer && (
                            <PracticeControls
                                onAgain={handleAgain}
                                onGotIt={handleGotIt}
                            />
                        )}

                    </div>

                </div>

            </div>

        </main>
    );
}
