

export default function PracticeProgress({ current, total }) {
    
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-semibold text-[#965c09]/60">
                Card {current} / {total}
            </p>

            <div className="w-64 h-2 bg-[#965c09]/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#965c09] rounded-full transition-all duration-300"
                    style={{
                        width: `${total > 0 ? (current / total) * 100 : 0}%`,
                    }}
                />
            </div>
        </div>
    );
}
