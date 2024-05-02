import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import AuthProvider from "./providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Laceco Portal",
  description: "Laceco's Intranet Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={`bg-white`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
