import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import AuthProvider from "./providers/AuthProvider";
import Sidebar from "./components/sidebar/Sidebar";

export const metadata = {
  title: "Laceco Portal",
  description: "Laceco's Intranet Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">


      <body className="flex flex-col gap-4 h-screen">
        <AuthProvider>
          <Header />
          <div className="flex h-full">
            <Sidebar />
            {children}
          </div>
        </AuthProvider>
      </body>

    </html >
  );

}
