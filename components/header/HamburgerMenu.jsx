"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavbarLink from "./NavbarLink";

export default function HamburgerMenu({ links, positionTop }) {
  return (
    <Popover className="group flex-center static mr-2 lg:hidden">
      <PopoverButton className="hover:text-primary-500 cursor-pointer text-2xl">
        <RxHamburgerMenu className="group-data-open:text-primary-500" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="flex-center border-primary-200 bg-primary-100 dark:bg-primary-200 fixed left-0 z-11 w-full origin-top gap-4 border-y py-2 shadow-lg transition duration-100 ease-out data-closed:opacity-0"
        style={{ top: positionTop }}
      >
        {links.map((link) => (
          <React.Fragment key={link.href}>
            <NavbarLink link={link} />
          </React.Fragment>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
