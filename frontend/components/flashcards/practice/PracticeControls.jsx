


export default function PracticeControls({ onAgain, onGotIt }) {
    
    return (
        <div className="flex items-center justify-center gap-4">

            {/* again */}
            <button
                type="button"
                onClick={onAgain}
                className="px-8 py-3 rounded-xl bg-red-50 text-red-600 border-2 border-red-200 font-semibold hover:bg-red-100 transition-all cursor-pointer"
            >
                Again
            </button>

            {/* got it */}
            <button
                type="button"
                onClick={onGotIt}
                className="px-8 py-3 rounded-xl bg-green-50 text-green-600 border-2 border-green-200 font-semibold hover:bg-green-100 transition-all cursor-pointer"
            >
                Got it
            </button>

        </div>
    );
}
