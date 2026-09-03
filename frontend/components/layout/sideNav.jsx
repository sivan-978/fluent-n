"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/app/_providers/sidebarProvider";

const navItems = [
    {
        href: "/dashboard",
        label: "Home",
        icon: "/icons/home.png",
        match: (pathname) => pathname === "/dashboard",
    },
    {
        href: "/library/flashcard-sets",
        label: "Library",
        icon: "/icons/folder.png",
        match: (pathname) => pathname.startsWith("/library"),
    },
    {
        href: "/notifications",
        label: "Notifications",
        icon: "/icons/notification.png",
        match: (pathname) => pathname === "/notifications",
    },
];


export default function SideNav() {
    const pathname = usePathname();
    const { open } = useSidebar();

    return (
        <aside className={`text-[#965c09] transition-all duration-200 ease-in-out ${open ? "w-64" : "w-0"} overflow-hidden bg-[#fbe9d0] flex-shrink-0 min-h-screen`}>
             <nav className='w-64 px-5 py-6 '>

                <div className='grid gap-2 border-b-2 pb-6'>
                    {navItems.map((item) => {
                        const active = item.match(pathname);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-4 rounded-lg py-2 pl-4 font-semibold
                                    transition-colors duration-200
                                    ${
                                        active
                                        ? "bg-[#f1d4b5]"
                                        : "hover:bg-[#f6dcc0]"
                                    }
                                `}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={32}
                                    height={32}
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

            </nav>
        </aside>
    )
}
