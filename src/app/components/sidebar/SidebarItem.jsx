
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'


function SidebarItem({ Icon, label, redirect }) {
    const pathname = usePathname()
    const isActive = (pathname === redirect);

    return (
        <div
            className={`hover:bg-bg-primary-h cursor-pointer rounded-lg overflow-hidden transition-colors duration-200 ${isActive ? 'bg-bg-primary-h' : ''
                }`}
        >
            <Link href={redirect} passHref>
                <div title={label} className={`flex items-center gap-6  p-2 ${isActive ? 'text-white' : ''}`}>
                    <Icon className="min-w-7 h-7 fill-white" />
                </div>
            </Link>
        </div>
    );
}

export default SidebarItem;