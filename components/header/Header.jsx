import { getUserCart } from "@/lib/actions/cart-actions";
import React from "react";
import CartModal from "../cart/CartModal";
import AccountButton from "./AccountButton";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import NavbarLink from "./NavbarLink";
import SearchBar from "./SearchBar";

const links = [
  { href: "/products", title: "Products" },
  { href: "/about", title: "About Us" },
  { href: "/contacts", title: "Contacts" },
];

export default async function Header() {
  const cart = await getUserCart();

  return (
    <header className="flex flex-col sticky top-0 inset-x-0 z-10">
      <div className="grid grid-cols-[auto_auto] lg:flex gap-y-3 lg:gap-x-3 items-center justify-between px-3 md:px-6 py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <HamburgerMenu links={links} positionTop="107.5px" />
          </div>

          <Logo />

          <nav className="hidden lg:ml-6 lg:mr-4 lg:text-nowrap lg:flex lg:items-center lg:gap-2">
            {links.map((link) => (
              <React.Fragment key={link.href}>
                <NavbarLink link={link} />
              </React.Fragment>
            ))}
          </nav>
        </div>

        <SearchBar />

        <div className="flex items-center gap-3 md:gap-4">
          <CartModal cart={cart} />
          <AccountButton />
        </div>
      </div>
    </header>
  );
}
