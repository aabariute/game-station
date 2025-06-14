"use client";

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CheckoutNavigation({ activePage }) {
  return (
    <ol className="mb-8 text-sm flex items-center">
      <li>
        {activePage === 1 ? (
          <span className="font-bold">Information</span>
        ) : (
          <Link
            href="/checkout/information"
            className="text-[#f5025b] font-medium hover:text-[#ab0240]"
          >
            Information
          </Link>
        )}
        <IoIosArrowForward
          className={
            activePage === 1
              ? "text-neutral-600 dark:text-neutral-400 inline mx-2"
              : "inline mx-2"
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
            className="text-[#f5025b] font-medium hover:text-[#ab0240]"
          >
            Shipping
          </Link>
        )}
        <IoIosArrowForward className="text-neutral-600 dark:text-neutral-400 inline mx-2" />
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
