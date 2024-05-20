
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SidebarItem({ Icon, label, redirect }) {
    const pathname = usePathname()
    const isActive = (pathname === redirect);

    return (
        <div
            className={`hover:bg-pri-hovc cursor-pointer rounded-lg overflow-hidden transition-colors duration-200 ${isActive ? 'bg-pri-hovc' : ''}`}
        >
            <Link href={redirect} passHref>
                <div title={label} className={`flex items-center gap-6  p-2 ${isActive ? 'text-white' : ''}`}>
                    {Icon}
                </div>
            </Link>
        </div>
    );
}

export default SidebarItem;