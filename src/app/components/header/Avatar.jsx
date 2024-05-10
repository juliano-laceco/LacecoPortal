import Image from 'next/image'
import Link from 'next/link'
import SignOutListItem from './SignOutListItem'

function Avatar({ name, email, sub }) {

    return (
        <>
            <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm rounded-full"
                type="button"
            >
                <Image
                    className="rounded-full ring-[3px] ring-pric mob:ring-gray-300"
                    height="55"
                    width="55"
                    src="/resources/images/dummyuser.jpg"
                    alt="profile pic"
                />
            </button>
            <div
                id="dropdownAvatar"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-2xl w-64"
            >
                <div className="px-4 py-3 text-sm  mob:py-2">
                    <div>{name}</div>
                    <div className="text-xs font-bold truncate mt-1">{email}</div>
                </div>
                <ul className="py-2 text-sm  mob:py-1" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link href="/" className="block px-4 py-2 hover:bg-basic-item-hov">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/profile" className="block px-4 py-2 hover:bg-basic-item-hov">Profile</Link>
                    </li>
                    <SignOutListItem />
                </ul>
            </div >
        </>
    )
}

export default Avatar
