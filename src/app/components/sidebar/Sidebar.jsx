"use client"

import Image from 'next/image';
import SidebarItem from './SidebarItem';
import { signOut } from 'next-auth/react';

function Sidebar({ sidebarItems }) {

    return (
        <div className={"bg-pric fixed z-30 left-0 top-28 w-fit h-full p-3 rounded-tr-md transition-all duration-500 flex flex-col items-center justify-between mob:hidden tablet:hidden"}>
            <div className="relative flex flex-col gap-7">
                {
                    sidebarItems.map((item) => (
                        <SidebarItem key={item.id} Icon={item.icon} label={item.label} redirect={item.redirectTo} />
                    ))
                }
            </div>
            <div title="Sign Out" className="text-white mb-28 p-2 hover:bg-pri-hovc cursor-pointer rounded-lg overflow-hidden transition-colors duration-500" onClick={() => signOut()}>
                <Image src="/resources/icons/logout.svg" height="30" width="30" alt="logout-icon" className="fill-green-500"/>
            </div>
        </div>
    )
}

export default Sidebar