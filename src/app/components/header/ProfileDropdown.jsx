import Image from 'next/image'
import Link from 'next/link'
import SignOutListItem from './SignOutListItem'

function ProfileDropdown({ name, email, sub }) {

    return (
        <>
            <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm bg-gray-800 rounded-full md:me-4 focus:ring-3 focus:ring-gray-300"
                type="button"
            >
                <Image
                    className="rounded-full"
                    height="50"
                    width="50"
                    src="/resources/logos/dummyuser.jpg"
                    alt="profile pic"
                />
            </button>
            <div
                id="dropdownAvatar"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-2xl shadow-xl w-64"
            >
                <div className="px-4 py-3 text-sm text-gray-900 mob:py-2">
                    <div>{name}</div>
                    <div className="text-tiny font-bold truncate mt-1">{email}</div>
                </div>
                <ul className="py-2 text-small text-gray-700 mob:py-1" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link href="/" className="block px-4 py-2 hover:bg-gray-h">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-h">Profile</Link>
                    </li>
                    <SignOutListItem />
                </ul>
            </div >
        </>
    )
}

export default ProfileDropdown
