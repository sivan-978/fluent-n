import SideNav from "@/components/layout/sideNav"
import LoggedinHeader from "@/components/layout/loggedinHeader"

function notificationLayout({ children }) {
    return (
        <div className='flex flex-col h-screen'>

            <header className='flex-shrink-0'>
                <LoggedinHeader />
            </header>

            <div className='flex flex-1 overflow-hidden'>

                <aside className='flex-shrink-0 bg-slate-700 h-full'>
                    <SideNav />
                </aside>

                <main className='bg-slate-800 flex flex-col  flex-1 overflow-auto px-8 py-5 gap-16'>

                    {children}

                </main>

            </div>

        </div>
    )
}

export default notificationLayout
