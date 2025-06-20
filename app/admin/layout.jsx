import { auth } from "@/auth";
import HamburgerMenu from "@/components/header/HamburgerMenu";
import Logo from "@/components/header/Logo";
import NavbarLink from "@/components/header/NavbarLink";
import { signOutUser } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";

const links = [
  { href: "/admin/overview", title: "Overview" },
  { href: "/admin/products", title: "Products" },
  { href: "/admin/orders", title: "Orders" },
  { href: "/admin/users", title: "Users" },
];

export default async function Layout({ children }) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <>
      <header className="flex-between sticky inset-x-0 top-0 z-10 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md md:px-6 dark:bg-[#0f0f12]/90">
        <div className="flex-center gap-2">
          <div className="lg:hidden">
            <HamburgerMenu links={links} positionTop="58px" />
          </div>
          <Logo />
          <nav className="hidden lg:ml-6 lg:flex lg:gap-3">
            {links.map((link) => (
              <React.Fragment key={link.href}>
                <NavbarLink link={link} />
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin/profile">
            <PiUserCircleLight className="cursor-pointer text-[28px]" />
          </Link>

          <form action={signOutUser} className="flex items-center">
            <button type="submit">
              <IoIosLogOut className="cursor-pointer text-[28px]" />
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
