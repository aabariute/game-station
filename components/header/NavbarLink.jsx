"use client";

import { useClose } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink({ link }) {
  const pathname = usePathname();
  const close = useClose();

  return (
    <Link
      href={link.href}
      onClick={() => close()}
      className={`rounded-lg px-3 py-2 font-light ${
        pathname.includes(link.href) ? "font-semibold" : ""
      }`}
    >
      {link.title}
    </Link>
  );
}
