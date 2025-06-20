"use client";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNavbar() {
  const pathname = usePathname();
  const pageName = pathname.split("/").at(2);

  if (!pageName) return null;

  return (
    <div className="flex-center bg-accent-indigo-foreground w-full pt-12 text-white">
      <div className="w-full max-w-4xl px-4">
        <h2 className="mb-14 text-center text-4xl font-medium">
          {capitalize(pageName)}
        </h2>

        <nav className="flex gap-4 text-lg">
          <Link
            href="/user/profile"
            className={`${
              pathname === "/user/profile" ? "border-b-4 border-b-white" : ""
            } px-3 py-2`}
          >
            Profile
          </Link>
          <Link
            href="/user/orders"
            className={`${
              pathname.includes("/user/orders")
                ? "border-b-4 border-b-white"
                : ""
            } px-3 py-2`}
          >
            Orders
          </Link>
          <Link
            href="/user/settings"
            className={`${
              pathname === "/user/settings" ? "border-b-4 border-b-white" : ""
            } px-3 py-2`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
