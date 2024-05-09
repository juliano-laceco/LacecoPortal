
import Image from "next/image"
import Link from "next/link";
import ProfileDropdown from "./Avatar";
import { getSession } from "@/app/utilities/auth-utils";
import BurgerNav from "./BurgerNav";

async function Header({ burgerNavItems }) {

    const session = await getSession()

    return (
        <nav class="bg-pric border-gray-200 dark:bg-gray-900">
            <div class="flex flex-wrap items-center justify-between mx-auto p-4 mob:p-2">
                <Link href="/" class="flex items-center space-x-3">
                    <Image src="/resources/logos/laceco-white.png" width="160" height="20" className="mob:hidden" />
                </Link>
                {session &&
                    <>
                        <div class="flex items-center space-x-3 md:space-x-0">
                            <ProfileDropdown name={session?.user?.name} email={session?.user?.email} sub={session?.user?.sub} />
                            <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-small text-white rounded-lg md:hidden focus:text-darkgrey focus:bg-white" aria-controls="navbar-user" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
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
