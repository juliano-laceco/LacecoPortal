import { getLoggedInRole } from "@/app/utilities/db-utils";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "490632785003-uncrgfjfimke37ddslfpp6nrenpuvmlf.apps.googleusercontent.com",
            clientSecret: "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",
            profile(profile) {

                console.log("Profile Google :", profile)

                return {
                    ...profile,
                    id: profile.sub,
                    email: profile.email,
                    image: profile.picture
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const { role_name, role_id } = await getLoggedInRole(token.sub)
                token = { ...token, role_name, role_id }
            }
            console.log("Token :", token)
            return token
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            console.log("Session :", token)
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }

};