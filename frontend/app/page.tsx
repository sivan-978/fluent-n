import Header from "@/components/header"
import Link from "next/link";



export default function Home() {
    return (
        <div className="bg-cyan-800 min-h-screen w-full">
            <Header />

            <div className=" flex-1 flex flex-col items-center justify-center mt-24 px-72 text-center">
                <p className="font-semibold text-5xl">Make it enjoyable with Fluent</p>
                <p className="font-normal text-2xl mt-6">Master whatever you're learning with Fluent's interactive flashcards, practice tests, and study activities.</p>
                <Link href="/signup" className="bg-yellow-600 py-2 px-3 mt-5 rounded-full font-medium text-xl hover:bg-yellow-700 transition-colors">Sing up for free</Link>
            </div>

        </div>
    );
}
