"use client"

import { signIn, useSession } from "next-auth/react";
import React from 'react';
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
        return <div>Loading...</div>;
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
        <div>
            <div className="relative py-16 bg-gradient-to-br mt-12 ">
                <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                    <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                        <div className="rounded-xl bg-white shadow-2xl">
                            <div className="p-6 sm:p-16">
                                <Image src="/resources/logos/laceco-gray.png" className="mb-10" alt="Laceco Logo" height="30" width="120" />
                                <h2 className="mb-8 text-xl text-gray-600 font-semibold">Sign in with Google to proceed <br /> to your profile.</h2>
                                <div className="mt-10 grid space-y-4">
                                    <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300  hover:border-primary" onClick={handleSignIn}>
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <Image src="/resources/logos/google-icon.png" className="absolute left-0" alt="Google Logo" height="30" width="30" />
                                            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-gray-800 sm:text-base">Continue with Google</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="mt-20 space-y-4 text-gray-600 text-center sm:-mb-8">
                                    <p className="text-xs">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and confirm you have read our <a href="#" className="underline">Privacy and Cookie Statement</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
