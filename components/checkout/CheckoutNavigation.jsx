"use client";

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CheckoutNavigation({ activePage }) {
  return (
    <ol className="mb-8 flex items-center text-sm">
      <li>
        {activePage === 1 ? (
          <span className="font-bold">Information</span>
        ) : (
          <Link
            href="/checkout/information"
            className="font-medium text-[#f5025b] hover:text-[#ab0240]"
          >
            Information
          </Link>
        )}
        <IoIosArrowForward
          className={
            activePage === 1
              ? "mx-2 inline text-neutral-600 dark:text-neutral-400"
              : "mx-2 inline"
          }
        />
      </li>
      <li>
        {activePage === 2 ? (
          <span className="font-bold">Shipping</span>
        ) : activePage < 2 ? (
          <span className="text-neutral-600 dark:text-neutral-400">
            Shipping
          </span>
        ) : (
          <Link
            href="/checkout/shipping"
            className="font-medium text-[#f5025b] hover:text-[#ab0240]"
          >
            Shipping
          </Link>
        )}
        <IoIosArrowForward className="mx-2 inline text-neutral-600 dark:text-neutral-400" />
      </li>
      <li>
        {activePage === 3 ? (
          <span className="font-bold">Payment</span>
        ) : (
          <span className="text-neutral-600 dark:text-neutral-400">
            Payment
          </span>
        )}
      </li>
    </ol>
  );
}
