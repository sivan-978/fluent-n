import Link from "next/link";


const NAV_LINKS = [
    { name: 'Library', href: '/sets' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
]

function Header() {
    return (
        <header className='bg-[#FFF5E6] flex justify-between py-2'>

            <Link href="/" className='flex gap-1 items-center ml-8 py-2'>
                <img className='h-14 rounded-full' src="/icons/graduation.png" alt="Fluent logo"/>
                <span className='text-2xl font-black text-[#965c09]'>Fluent</span>
            </Link>

            <nav className='flex gap-6 justify-center items-center'>
                {NAV_LINKS.map(link => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='text-[#965c09]/80 font-semibold text-[16px] hover:text-[#fc6b03] transition-colors'
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            <div className='flex items-center gap-4 px-7'>
                <Link href="/login">
                    <button className='px-6 py-2.5 font-bold text-[#965c09] hover:text-[#fc6b03] transition-colors'>Log In</button>
                </Link>

                <Link href="/register">
                    <button className='px-6 py-2.5 bg-[#fc6b03] text-white font-bold rounded-full shadow-lg hover:bg-[#fd7b1a] hover:-translate-y-0.5 transition-all' >Get started</button>
                </Link>
            </div>

        </header>
    )
}

export default Header
