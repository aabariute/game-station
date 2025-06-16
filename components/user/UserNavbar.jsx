"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNavbar() {
  const pathname = usePathname();
  const pageName = pathname.split("/").at(2);

  if (!pageName) return null;

  return (
    <div className="w-full bg-neutral-800 dark:bg-black/20 text-white pt-12 flex-center">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-4xl text-center font-medium mb-14">
          {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
        </h2>

        <nav className="flex gap-4 text-lg">
          <Link
            href="/user/profile"
            className={`${
              pathname === "/user/profile" ? "border-b-4 border-b-pink-700" : ""
            } px-3 py-2`}
          >
            Profile
          </Link>
          <Link
            href="/user/orders"
            className={`${
              pathname.includes("/user/orders")
                ? "border-b-4 border-b-pink-700"
                : ""
            } px-3 py-2`}
          >
            Orders
          </Link>
          <Link
            href="/user/settings"
            className={`${
              pathname === "/user/settings"
                ? "border-b-4 border-b-pink-700"
                : ""
            } px-3 py-2`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
