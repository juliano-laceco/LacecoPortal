"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function BurgerNav({ burgerNavItems }) {

    const pathname = usePathname()
    return (
        <div className="items-center justify-between hidden w-full" id="navbar-user">
            <ul className="flex flex-col gap-1 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:hidden md:mt-0 md:border-0 md:bg-white">
                {
                    burgerNavItems.map((item) => (
                        <li key={crypto.randomUUID()}>
                            <Link href={item.redirectTo} className={`block text-med py-2 px-3 text-darkgrey border shadow ${pathname === item.redirectTo && "bg-gray-active text-white scale-[1.03]"} transition transition-scale-500 rounded md:p-0`}>{item.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BurgerNav



