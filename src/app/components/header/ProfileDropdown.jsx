import Image from 'next/image'
import React from 'react'

function ProfileDropdown({ name, email, sub }) {
    return (
        <>
            <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm bg-gray-800 rounded-full md:me-4 focus:ring-3 focus:ring-gray-300" // Add md:me-4 class
                type="button"
            >
                <Image
                    className="rounded-full"
                    height="45"
                    width="45"
                    src="/resources/logos/dummyuser.jpg"
                    alt="profile pic"
                />
            </button>
            <div
                id="dropdownAvatar"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-2xl shadow-xl w-64"
            >
                <div className="px-4 py-3 text-sm text-gray-900 ">
                    <div>{name}</div>
                    <div className="font-medium truncate">{email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Earnings</a>
                    </li>
                </ul>
                <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "> Sign out</a>
                </div>
            </div>
        </>
    )
}

export default ProfileDropdown
