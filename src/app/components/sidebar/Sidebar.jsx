"use client"

import SidebarItem from './SidebarItem';
import { signOut } from 'next-auth/react';
import { Logout } from '@mui/icons-material';

function Sidebar({ sidebarItems }) {

    return (
        <div className={"bg-primary w-fit h-full p-3 rounded-tr-md transition-all duration-500 flex flex-col items-center justify-between mob:hidden"}>
            <div className="flex flex-col gap-7">
                {
                    sidebarItems.map((item) => (
                        <SidebarItem key={item.id} Icon={item.icon} label={item.label} redirect={item.redirectTo} />
                    ))
                }
            </div>
            <div title="Sign Out" className="text-white p-2 hover:bg-bg-primary-h cursor-pointer rounded-lg overflow-hidden transition-colors duration-500" onClick={() => signOut()}>
                <Logout />
            </div>
        </div>
    )
}

export default Sidebar