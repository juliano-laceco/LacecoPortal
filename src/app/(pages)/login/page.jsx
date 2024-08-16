"use client"

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Image from "next/image";

function LoginPage() {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackUrl");
    const router = useRouter();
    const { data: session, status } = useSession();

    // Check if session is loading
    if (status === "loading") {
        return <div className='w-full text-center'>Loading...</div>;
    }

    // Redirect if user is already logged in
    if (session) {
        router.replace("/");
        return null; // Prevent rendering anything if redirecting
    }

    // Handle sign in
    const handleSignIn = () => {
        signIn("google", { callbackUrl: callbackURL ?? "/" });
    };

    return (
        <div className="relative py-16 bg-gradient-to-br mt-12 w-full">
            <div className="relative container mx-auto px-6 text-darkgrey mob:px-0">
                <div className="mx-auto md:w-10/12 lg:w-6/12 xl:w-6/12">
                    <div className="rounded-xl bg-white shadow-2xl">
                        <div className="p-6 lap:p-16 desk:p-16">
                            <Image src="/resources/logos/laceco-gray.png" className="mb-10" alt="laceco-logo" height="30" width="120" />
                            <h2 className="mb-8 text-xl text-darkgrey font-semibold">Sign in with Google to proceed<br /> to your profile.</h2>
                            <div className="mt-10 grid gap-4">
                                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-pric" onClick={handleSignIn}>
                                    <div className="relative flex gap-2 mob:w-fit items-center justify-center">
                                        <Image src="/resources/icons/google-icon.png" alt="google-logo" height="30" width="30" />
                                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-gray-800 sm:text-base">Continue with Google</span>
                                    </div>
                                </button>
                            </div>
                            <div className="mt-20 space-y-4 darkgrey text-center sm:-mb-8">
                                <p className="text-xs">By proceeding, you agree to our <a href="https://developers.google.com/terms" className="underline">Terms of Use</a> and confirm you have read our <a href="https://developers.google.com/identity/protocols/oauth2/policies" className="underline">Privacy and Cookie Statement</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginPage;
