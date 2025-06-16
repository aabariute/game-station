"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavbarLink from "./NavbarLink";

export default function HamburgerMenu({ links, positionTop }) {
  return (
    <Popover className="group static mr-2 lg:hidden flex-center">
      <PopoverButton className="text-2xl hover:text-neutral-500 cursor-pointer">
        <RxHamburgerMenu className="group-data-open:text-neutral-500" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="fixed left-0 z-11 py-2 bg-neutral-100 dark:bg-neutral-700 flex-center gap-4 w-full border-y border-neutral-200 dark:border-neutral-800 shadow-lg origin-top transition duration-100 ease-out data-closed:opacity-0"
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
