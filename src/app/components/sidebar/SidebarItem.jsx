
"use client"

import { red } from '@mui/material/colors'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


function SidebarItem({ Icon, label, redirect }) {
    const pathname = usePathname()
    console.log(pathname)
    const isActive = (pathname === redirect);

    return (
        <div
            className={`hover:bg-bg-primary-h cursor-pointer rounded-lg overflow-hidden transition-colors duration-500 ${isActive ? 'bg-bg-primary-h' : ''
                }`}
        >
            <Link href={redirect} passHref>
                <div className={`flex items-center gap-6  p-2 ${isActive ? 'text-white' : ''}`}>
                    <Icon className="min-w-7 h-7 fill-white" />
                </div>
            </Link>
        </div>
    );
}

export default SidebarItem;