import "./globals.css";

import Header from "./components/header/Header";
import AuthProvider from "./providers/AuthProvider"; // Import your AuthProvider component
import Sidebar from "./components/sidebar/Sidebar";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupsIcon from '@mui/icons-material/Groups';
import { getSession } from "./utilities/auth-utils";



export const metadata = {
  title: "Laceco Portal",
  description: "Laceco's Intranet Portal",
};

export default async function RootLayout({ children }) {

  const session = await getSession()


  const sidebarItems = [
    { id: crypto.randomUUID(), icon: PersonAddAlt1Icon, label: "Add Employee", redirectsTo: "/hr/add-employee" },
    { id: crypto.randomUUID(), icon: GroupsIcon, label: "Employee Management", redirectsTo: "/hr/employee-management" },
  ];



  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </head>
      <body className="flex flex-col gap-4 h-screen">

        <AuthProvider>
          <Header />
          <div className="flex gap-5 h-full">
            {!!session && <Sidebar sidebarItems={sidebarItems} />} {/* Render sidebar only if user is authenticated */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}