import Image from "next/image"
import Button from "../components/buttons/Button"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

function Forbidden() {
    return (
        <div class="flex flex-col items-center justify-center w-screen ">
            <Image src="/resources/logos/forbidden.svg" width="500" height="500" />
            <div class="flex flex-col items-center gap-4">
                <h1 class="text-3xl font-medium text-center">
                    You are not authorized
                </h1>
                <p class="text-xl text-center ">
                    You tried to access a page you do not have authorization for.
                </p>
                <Link href="/">
                    <Button name="Back to Home" className="mt-6" primary large Icon={ArrowBackIcon} ltr />
                </Link>
            </div>
        </div>
    )
}

export default Forbidden