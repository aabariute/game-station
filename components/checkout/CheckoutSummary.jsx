"use client";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CheckoutSummary({ user, shippingMethod }) {
  const pathname = usePathname();
  const { first_name, last_name, email, address } = user;

  return (
    <div className="border-primary-300 rounded-md border p-4 shadow-sm">
      <div className="border-primary-200 grid grid-cols-[100px_1fr_80px] items-center border-b pb-3">
        <div className="text-primary-600">Contact</div>
        <div className="text-sm">
          {first_name} {last_name}
        </div>
        <Link
          href="/checkout/information"
          className="button-tertiary justify-self-end pb-[0.075rem] text-sm"
        >
          Change
        </Link>
        <div className="col-2 text-sm">{email}</div>
      </div>

      <div
        className={`grid grid-cols-[100px_1fr_80px] items-center pt-3 ${
          pathname.split("/").at(-1) === "payment" &&
          "border-primary-200 border-b pb-3"
        }`}
      >
        <div className="text-primary-600 col-1 self-start">Ship to</div>
        <div className="text-sm">
          {address.street_address}, {address.zip_code} {address.city},{" "}
          {address.country}
        </div>
        <Link
          href="/checkout/information"
          className="button-tertiary justify-self-end pb-[0.075rem] text-sm"
        >
          Change
        </Link>
      </div>

      {pathname.split("/").at(-1) === "payment" && (
        <div className="grid grid-cols-[100px_1fr_80px] items-center pt-3">
          <div className="text-primary-600">Shipping</div>
          <div className="text-sm">{capitalize(shippingMethod)}</div>
          <Link
            href="/checkout/shipping"
            className="button-tertiary justify-self-end pb-[0.075rem] text-sm"
          >
            Change
          </Link>
        </div>
      )}
    </div>
  );
}
