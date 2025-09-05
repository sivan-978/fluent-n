import Link from "next/link";
import { usePathname } from "next/navigation";

function sideNav() {
    const pathname = usePathname();
    return (
        <aside>
            <nav className='grid w-64 px-5 py-6 '>

                <div className='border-b-2 pb-6 gap-2 grid'>
                    <Link href="/home" className={`hover:bg-slate-600 flex items-center gap-4 pl-4 py-1 rounded-lg 
                        ${pathname === "/home" ? "bg-slate-600" : ""}`}
                    >
                        <img src="/icons/home.png" alt="Home" className='h-8 w-8' />
                        <p className='font-semibold'>Home</p>
                    </Link>

                    <Link href="/library" className={`hover:bg-slate-600 flex items-center gap-4 pl-4 py-1 rounded-lg 
                        ${pathname === "/home" ? "bg-slate-600" : ""}`}
                    >
                        <img src="/icons/folder.png" alt="Folder" className='h-8 w-8' />
                        <p className='font-semibold'>Library</p>
                    </Link>

                    <Link href="/notifications" className={`hover:bg-slate-600 flex items-center gap-4 pl-4 py-1 rounded-lg 
                        ${pathname === "/home" ? "bg-slate-600" : ""}`}
                    >
                        <img src="/icons/notification.png" alt="notification" className='h-8 w-8' />
                        <p className='font-semibold'>Notifications</p>
                    </Link>
                </div>

            </nav>
        </aside>
    )
}

export default sideNav