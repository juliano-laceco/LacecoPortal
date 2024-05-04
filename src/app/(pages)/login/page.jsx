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
        <div class="relative py-16 bg-gradient-to-br mt-12">
        <div class="relative container mx-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div class="mx-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                <div class="rounded-xl bg-white shadow-2xl">
                    <div class="p-6 sm:p-16">
                        <img src="/resources/logos/laceco-gray.png" class="mb-10" alt="Laceco Logo" height="30" width="120" />
                        <h2 class="mb-8 text-xl darkgrey font-semibold">Sign in with Google to proceed<br /> to your profile.</h2>
                        <div class="mt-10 grid gap-4">
                            <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-primary" onClick={handleSignIn}>
                                <div class="relative flex items-center justify-center">
                                    <img src="/resources/logos/google-icon.png" class="absolute left-0" alt="Google Logo" height="30" width="30" />
                                    <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-gray-800 sm:text-base">Continue with Google</span>
                                </div>
                            </button>
                        </div>
                        <div class="mt-20 space-y-4 darkgrey text-center sm:-mb-8">
                            <p class="text-xs">By proceeding, you agree to our <a href="https://developers.google.com/terms" class="underline">Terms of Use</a> and confirm you have read our <a href="https://developers.google.com/identity/protocols/oauth2/policies" class="underline">Privacy and Cookie Statement</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default LoginPage;
