
import Image from "next/image"
import Link from "next/link";
import ProfileDropdown from "./Avatar";
import { getSession } from "@/utilities/auth-utils";
import BurgerNav from "./BurgerNav";

async function Header({ burgerNavItems }) {

    const session = await getSession()

    return (
        <nav className="bg-nav-c shadow-md mob:bg-pric tablet:bg-pric">
            <div className="flex flex-wrap items-center justify-between mx-auto p-5 mob:p-2">
                <Link href="/" className="flex items-center space-x-3">
                    <Image src="/resources/logos/laceco-gray.png" width="160" height="20" className="mob:hidden tablet:hidden" alt="laceco-logo" />
                </Link>
                {session &&
                    <>
                        <div className="flex items-center space-x-3 md:space-x-0">
                            <ProfileDropdown name={session?.user?.name} email={session?.user?.email} sub={session?.user?.sub} />
                            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:text-pri-txtc focus:bg-white" aria-controls="navbar-user" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                        <BurgerNav burgerNavItems={burgerNavItems} />
                    </>
                }
            </div>

        </nav>

    )
}

export default Header
