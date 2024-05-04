"use client"

import Image from "next/image"
import { signOut, useSession } from "next-auth/react";
import Button from "../buttons/Button";
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

    const { data: session, status } = useSession();

    return (
        <div className="bg-primary p-6">
            <div className="flex items-center justify-between">
                <Image src="/resources/logos/laceco-white.png" width="160" height="20" />
                {!!session &&  <Button name="Logout" className="text-2xl" large plain Icon={LogoutIcon} onClick={signOut}/>}
            </div>
        </div>
    )
}

export default Header
