
import Link from "next/link";
import LoggedinHeader from "@/components/loggedinHeader.jsx"
import SideNav from "@/components/sideNav.jsx"


function home() {
    return (
        <div className='flex flex-col h-screen'>
            <header className='flex-shrink-0'>
                <LoggedinHeader />
            </header>

            <div className='flex flex-1 overflow-hidden'>
                <aside className='flex-shrink-0 bg-slate-700 h-full'>
                    <SideNav />
                </aside>

                <main className='bg-slate-800 grid flex-1 overflow-auto px-8 py-5 gap-16'>

                    <div className=''>
                        <div className='flex justify-between'>
                            <p className='font-semibold text-5xl'>Welcome back, Alex!</p>
                            <div className='flex items-center gap-1 pr-7'>
                                <p className='font-semibold text-3xl'>2</p>
                                <img src="/icons/streak.png" alt="streak" className='h-12' />
                            </div>
                        </div>
                        <Link href='/sets/create' className=' mt-7 mr-4 inline-block py-[6px] px-6 bg-blue-600 font-semibold rounded-full text-2xl hover:bg-blue-700'>Create</Link>
                        <Link href='/create' className='inline-block py-[6px] px-6 bg-blue-400 font-semibold rounded-full text-2xl hover:bg-blue-500'>Learn</Link>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default home