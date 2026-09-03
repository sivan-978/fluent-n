

export default function FlashcardCancelModal({ onStay, onLeave }) {
    return (
        <div className="flex items-center justify-center fixed inset-0 z-50">

            {/* background */}
            <div className="flex flex-col gap-3 px-32 py-10 justify-center items-center relative shadow-xl border-2 border-[#fc6b03] rounded-2xl bg-[#fcf5ec]">

                <p className="mb-4 font-semibold text-[#965c09]">
                    Discard changes?
                </p>

                <div className="flex gap-5">
                    {/* stay */}
                    <button
                        type="button"
                        onClick={onStay}
                        className="px-4 py-2 rounded-xl bg-[#fde2c2] text-[#965c09] font-semibold hover:bg-[#f0d2ac]"
                    >
                        Stay
                    </button>

                    {/* Leave */}
                    <button
                        type="button"
                        onClick={onLeave}
                        className="px-4 py-2 rounded-xl bg-[#fc6b03] text-white font-semibold hover:bg-[#e85d00]"
                    >
                        Leave
                    </button>

                </div>
            </div>
        </div>
    );
}
