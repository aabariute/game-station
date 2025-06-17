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
    <header className="sticky inset-x-0 top-0 z-10 flex flex-col">
      <div className="grid grid-cols-[auto_auto] items-center justify-between gap-y-3 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md md:px-6 lg:flex lg:gap-x-3 dark:bg-neutral-900/90">
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <HamburgerMenu links={links} positionTop="107.5px" />
          </div>

          <Logo />

          <nav className="hidden lg:mr-4 lg:ml-6 lg:flex lg:items-center lg:gap-2 lg:text-nowrap">
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
