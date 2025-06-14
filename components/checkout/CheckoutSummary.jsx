"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CheckoutSummary({ user, shipping_method }) {
  const pathname = usePathname();
  const { first_name, last_name, email, address } = user;

  return (
    <div className="p-4 border border-neutral-200 dark:border-gray-700 rounded-md shadow-sm">
      <div className="grid grid-cols-[100px_1fr_80px] items-center border-b border-neutral-200 dark:border-gray-700 pb-3">
        <div className="text-neutral-500 dark:text-neutral-400">Contact</div>
        <div className="text-sm">
          {first_name} {last_name}
        </div>
        <Link
          href="/checkout/information"
          className="button-tertiary pb-[0.075rem] justify-self-end text-sm"
        >
          Change
        </Link>
        <div className="col-2 text-sm">{email}</div>
      </div>

      <div
        className={`grid grid-cols-[100px_1fr_80px] items-center pt-3 ${
          pathname.split("/").at(-1) === "payment" &&
          "border-b border-neutral-200 dark:border-gray-700 pb-3"
        }`}
      >
        <div className="col-1 text-neutral-500 dark:text-neutral-400 self-start">
          Ship to
        </div>
        <div className="text-sm">
          {address.street_address}, {address.zip_code} {address.city},{" "}
          {address.country}
        </div>
        <Link
          href="/checkout/information"
          className="button-tertiary pb-[0.075rem] justify-self-end text-sm"
        >
          Change
        </Link>
      </div>

      {pathname.split("/").at(-1) === "payment" && (
        <div className="grid grid-cols-[100px_1fr_80px] items-center pt-3">
          <div className="text-neutral-500 dark:text-neutral-400">Shipping</div>
          <div className="text-sm">
            {shipping_method}
            {/* {shipping_method.charAt(0).toUpperCase() + shipping_method.slice(1)} */}
          </div>
          <Link
            href="/checkout/shipping"
            className="button-tertiary pb-[0.075rem] justify-self-end text-sm"
          >
            Change
          </Link>
        </div>
      )}
    </div>
  );
}
