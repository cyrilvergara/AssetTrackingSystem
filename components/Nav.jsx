"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Sidebar,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { SunIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

// const Nav = () => {
// const pathname = usePathname();

// const handleLogout = async () => {
//   signOut({ callbackUrl: "/" });
// };

// const { data: session } = useSession();
// const user = session?.user;
export default function Nav() {
  const pathname = usePathname();

  const handleLogout = async () => {
  signOut({ callbackUrl: "/" });
};

const { data: session } = useSession();
const user = session?.user;
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Asset Tracking</span>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
    // <nav className="flex justify-between bg-nav p-4">
    //   <div className="flex items-center space-x-4">
    //     <Link href="/AssetsPage">
    //       <svg
    //         width="30"
    //         height="30"
    //         viewBox="0 0 15 15"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M3.87935 1H3.9H11.1H11.1207C11.5231 0.999994 11.8553 0.999989 12.1259 1.0221C12.407 1.04506 12.6653 1.09434 12.908 1.21799C13.2843 1.40973 13.5903 1.7157 13.782 2.09202C13.9057 2.33469 13.9549 2.59304 13.9779 2.87409C14 3.14468 14 3.47686 14 3.87934V3.9V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H3.9H3.87934C3.47686 14 3.14468 14 2.87409 13.9779C2.59304 13.9549 2.33469 13.9057 2.09202 13.782C1.7157 13.5903 1.40973 13.2843 1.21799 12.908C1.09434 12.6653 1.04506 12.407 1.0221 12.1259C0.999989 11.8553 0.999994 11.5231 1 11.1207V11.1207V11.1V3.9V3.87935V3.87934C0.999994 3.47686 0.999989 3.14468 1.0221 2.87409C1.04506 2.59304 1.09434 2.33469 1.21799 2.09202C1.40973 1.7157 1.7157 1.40973 2.09202 1.21799C2.33469 1.09434 2.59304 1.04506 2.87409 1.0221C3.14469 0.999989 3.47687 0.999994 3.87935 1ZM2.95552 2.01878C2.73631 2.03669 2.62421 2.06915 2.54601 2.10899C2.35785 2.20487 2.20487 2.35785 2.10899 2.54601C2.06915 2.62421 2.03669 2.73631 2.01878 2.95552C2.00039 3.18056 2 3.47171 2 3.9V7H7V2H3.9C3.47171 2 3.18056 2.00039 2.95552 2.01878ZM7 8H2V11.1C2 11.5283 2.00039 11.8194 2.01878 12.0445C2.03669 12.2637 2.06915 12.3758 2.10899 12.454C2.20487 12.6422 2.35785 12.7951 2.54601 12.891C2.62421 12.9309 2.73631 12.9633 2.95552 12.9812C3.18056 12.9996 3.47171 13 3.9 13H7V8ZM8 8H13V11.1C13 11.5283 12.9996 11.8194 12.9812 12.0445C12.9633 12.2637 12.9309 12.3758 12.891 12.454C12.7951 12.6422 12.6422 12.7951 12.454 12.891C12.3758 12.9309 12.2637 12.9633 12.0445 12.9812C11.8194 12.9996 11.5283 13 11.1 13H8V8ZM13 7H8V2H11.1C11.5283 2 11.8194 2.00039 12.0445 2.01878C12.2637 2.03669 12.3758 2.06915 12.454 2.10899C12.6422 2.20487 12.7951 2.35785 12.891 2.54601C12.9309 2.62421 12.9633 2.73631 12.9812 2.95552C12.9996 3.18056 13 3.47171 13 3.9V7Z"
    //           fill="currentColor"
    //           fill-rule="evenodd"
    //           clip-rule="evenodd"
    //         ></path>
    //       </svg>
    //     </Link>
    //     <Link href="/AssetsPage">
    //       <svg
    //         width="30"
    //         height="30"
    //         viewBox="0 0 15 15"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M1 1C0.447715 1 0 1.44772 0 2V13C0 13.5523 0.447715 14 1 14H14C14.5523 14 15 13.5523 15 13V2C15 1.44772 14.5523 1 14 1H1ZM7.5 10.625C9.22589 10.625 10.625 9.22589 10.625 7.5C10.625 5.77411 9.22589 4.375 7.5 4.375C5.77411 4.375 4.375 5.77411 4.375 7.5C4.375 9.22589 5.77411 10.625 7.5 10.625Z"
    //           fill="currentColor"
    //           fill-rule="evenodd"
    //           clip-rule="evenodd"
    //         ></path>
    //       </svg>
    //     </Link>
    //   </div>
    //   <div>
    //     <p className=" text-default-text">John.Doe@gmail.com</p>
    //     <Link href="/">
    //       <svg
    //         width="30"
    //         height="30"
    //         viewBox="0 0 15 15"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M3.87935 1H3.9H11.1H11.1207C11.5231 0.999994 11.8553 0.999989 12.1259 1.0221C12.407 1.04506 12.6653 1.09434 12.908 1.21799C13.2843 1.40973 13.5903 1.7157 13.782 2.09202C13.9057 2.33469 13.9549 2.59304 13.9779 2.87409C14 3.14468 14 3.47686 14 3.87934V3.9V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H3.9H3.87934C3.47686 14 3.14468 14 2.87409 13.9779C2.59304 13.9549 2.33469 13.9057 2.09202 13.782C1.7157 13.5903 1.40973 13.2843 1.21799 12.908C1.09434 12.6653 1.04506 12.407 1.0221 12.1259C0.999989 11.8553 0.999994 11.5231 1 11.1207V11.1207V11.1V3.9V3.87935V3.87934C0.999994 3.47686 0.999989 3.14468 1.0221 2.87409C1.04506 2.59304 1.09434 2.33469 1.21799 2.09202C1.40973 1.7157 1.7157 1.40973 2.09202 1.21799C2.33469 1.09434 2.59304 1.04506 2.87409 1.0221C3.14469 0.999989 3.47687 0.999994 3.87935 1ZM2.95552 2.01878C2.73631 2.03669 2.62421 2.06915 2.54601 2.10899C2.35785 2.20487 2.20487 2.35785 2.10899 2.54601C2.06915 2.62421 2.03669 2.73631 2.01878 2.95552C2.00039 3.18056 2 3.47171 2 3.9V7H7V2H3.9C3.47171 2 3.18056 2.00039 2.95552 2.01878ZM7 8H2V11.1C2 11.5283 2.00039 11.8194 2.01878 12.0445C2.03669 12.2637 2.06915 12.3758 2.10899 12.454C2.20487 12.6422 2.35785 12.7951 2.54601 12.891C2.62421 12.9309 2.73631 12.9633 2.95552 12.9812C3.18056 12.9996 3.47171 13 3.9 13H7V8ZM8 8H13V11.1C13 11.5283 12.9996 11.8194 12.9812 12.0445C12.9633 12.2637 12.9309 12.3758 12.891 12.454C12.7951 12.6422 12.6422 12.7951 12.454 12.891C12.3758 12.9309 12.2637 12.9633 12.0445 12.9812C11.8194 12.9996 11.5283 13 11.1 13H8V8ZM13 7H8V2H11.1C11.5283 2 11.8194 2.00039 12.0445 2.01878C12.2637 2.03669 12.3758 2.06915 12.454 2.10899C12.6422 2.20487 12.7951 2.35785 12.891 2.54601C12.9309 2.62421 12.9633 2.73631 12.9812 2.95552C12.9996 3.18056 13 3.47171 13 3.9V7Z"
    //           fill="currentColor"
    //           fill-rule="evenodd"
    //           clip-rule="evenodd"
    //         ></path>
    //       </svg>
    //     </Link>
    //   </div>
    // </nav>
  );
}
