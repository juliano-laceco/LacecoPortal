import Image from "next/image"
import Button from "../components/custom/Button"
import Link from "next/link";

function page() {
    return (
        <div className="flex flex-col items-center justify-center w-full ">
            <Image src="/resources/images/forbidden.svg" width="400" height="400" alt="forbidden" />
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-medium text-center">
                    You are not authorized
                </h1>
                <p className="text-lg text-center ">
                    You tried to access a page you do not have authorization for.
                </p>
                <Link href="/">
                    <Button name="Back to Home" className="mt-6" primary medium ltr />
                </Link>
            </div>
        </div>
    )
}

export default page