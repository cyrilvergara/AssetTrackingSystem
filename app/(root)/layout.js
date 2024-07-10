import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import SideBar from "@components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Asset Management System",
  description: "A simple asset management system built by cyvdev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Provider>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <SideBar />
            <div className="flex flex-col">
              <Nav />
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
