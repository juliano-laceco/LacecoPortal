"use client"

import Image from "next/image"
import { signOut, useSession } from "next-auth/react";

function Header() {

    const { data: session, status } = useSession();

    return (
        <div className="bg-primary p-6">
            <div className="flex justify-between">
                <Image src="/resources/logos/laceco-white.png" width="160" height="30" />
                {!!session && <button className="text-white" onClick={signOut}>Logout</button>}
            </div>
        </div>
    )
}

export default Header
