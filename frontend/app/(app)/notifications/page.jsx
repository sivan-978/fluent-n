
const notifications = [
    { message: "You have not been active sinds 4 days.", date: "12-4-2025", time: "10:43" },
    { message: "You still have not finished your A1 spanish flashcards.", date: "12-4-2025", time: "10:43" }
];

function notification() {

    if (notifications === 0) {
        return (
            <div>
                <h1 className="text-center text-4xl font-bold mt-16">NO Notifications</h1>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-4 ">
                <h1 className="ml-1 underline underline-offset-8 text-4xl font-bold mt-16 mb-10">Your Notifications</h1>
                {notifications.map((data, i) => (
                    <div key={i} className="flex bg-slate-700 py-2 px-5 rounded-full justify-between items-center gap-10 w-4/6">
                        <h1 key={i} className="text-xl font-medium break-words">{data.message}</h1>
                        <div className=" font-medium flex-shrink-0 whitespace-nowrap text-center text-sm">
                            <p>{data.date}</p>
                            <p>{data.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }


}

export default notification