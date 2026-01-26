
const NAV_LINKS = [
    { name: 'Home', href: '/home' },
    { name: 'Create', href: '/create' },
    { name: 'Study', href: '/study' },
]

function header() {
    return (
        <header className='bg-blue-500 flex justify-between py-2'>

            <div className='flex gap-1 items-center pl-16 py-2'>
                <img className='h-16 rounded-full' src="/icons/logo.jpg" alt="logo" />
                <p className='text-4xl font-bold text-gray-50'>Fleunt</p>
            </div>

            <nav className='flex gap-6 justify-center items-center'>
                {NAV_LINKS.map(link => (
                    <a
                        key={link.name}
                        href={link.href}
                        className='hover:text-gray-300 font-semibold text-[22px] transition-colors'
                    >
                        {link.name}
                    </a>
                ))}
            </nav>

            <div className='flex gap-1 flex-col items-center justify-center px-10'>
                <a href="/signup" className='font-semibold text-lg bg-red-600 rounded-full py-1 px-2 hover:text-gray-200 hover:bg-red-700 transition-colors' >SignUp</a>
                <a href="/login" className='font-semibold text-lg bg-yellow-500 rounded-full py-1 px-2 hover:text-gray-200 hover:bg-yellow-600 transition-colors'>LogIn</a>
            </div>

        </header>
    )
}

export default header