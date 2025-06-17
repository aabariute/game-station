"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavbarLink from "./NavbarLink";

export default function HamburgerMenu({ links, positionTop }) {
  return (
    <Popover className="group flex-center static mr-2 lg:hidden">
      <PopoverButton className="cursor-pointer text-2xl hover:text-neutral-500">
        <RxHamburgerMenu className="group-data-open:text-neutral-500" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="flex-center fixed left-0 z-11 w-full origin-top gap-4 border-y border-neutral-200 bg-neutral-100 py-2 shadow-lg transition duration-100 ease-out data-closed:opacity-0 dark:border-neutral-800 dark:bg-neutral-700"
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
