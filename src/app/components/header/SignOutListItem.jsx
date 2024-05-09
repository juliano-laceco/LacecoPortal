"use client"

import { signOut } from 'next-auth/react'

function SignOutListItem() {
    return (
        <div>
            <li>
                <button className="block px-4 py-2 hover:bg-bg-gray-h w-full text-left" onClick={() => signOut()}>Sign Out</button>
            </li>
        </div>
    )
}

export default SignOutListItem
