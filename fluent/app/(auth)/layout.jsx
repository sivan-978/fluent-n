export default function AuthLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden grid grid-cols-2">
            {/* Left side (shared between login & signup) */}
            <div className="sticky top-0 h-screen">
                <img
                    className="h-screen object-cover"
                    src="/icons/studyImg.avif"
                    alt="Image"
                />
                <h2 className="font-extrabold text-6xl text-red-500 absolute bottom-6 left-12">
                    Fluent
                </h2>
                <p className="font-bold text-4xl text-red-500 absolute top-8 left-24">
                    Fun and Enjoyable with Fluent
                </p>
            </div>

            {/* Right side (unique per page: login or signup) */}
            <div className="flex flex-col flex-1 overflow-auto">{children}</div>
        </div>
    );
}
