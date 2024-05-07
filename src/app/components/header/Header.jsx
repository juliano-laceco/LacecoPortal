"use client"

import Image from "next/image"
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

function Header() {

    const { data: session } = useSession();

    console.log(session)

    return (
        <div className="bg-primary p-4 sticky top-0 mob:">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <Image src="/resources/logos/laceco-white.png" width="160" height="20" className="mob:hidden" />
                </Link>
                {/* {!!session && <div className="flex items-center gap-1 cursor-pointer"><Image src="/resources/logos/dummyuser.jpg" height="45" width="45" className="rounded-full" /><p className="text-white text-small mob:hidden">{session.user.name}</p></div>} */}
                <ProfileDropdown name={session?.user?.name} email={session?.user?.email} />
            </div>
        </div>
    )
}

export default Header
