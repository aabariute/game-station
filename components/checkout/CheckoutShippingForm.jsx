"use client";

import { updateShippingMethod } from "@/lib/actions/cart-actions";
import { priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SpinnerMini from "../ui/SpinnerMini";

export default function CheckoutShippingForm({ selectedMethod, totalPrice }) {
  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        disabled={pending}
        className="button-primary w-26 flex-center gap-1"
      >
        {pending ? (
          <SpinnerMini />
        ) : (
          <>
            <span>Next</span>
            <FiArrowRight className="text-[18px]" />
          </>
        )}
      </button>
    );
  }

  return (
    <form action={updateShippingMethod} className="flex flex-1 flex-col">
      <h3 className="mt-8 mb-6 text-xl font-semibold">Shipping Method</h3>

      <div className="border border-neutral-300 dark:border-gray-700 rounded-md shadow-sm">
        <div className="px-4 flex-between border-b border-neutral-300 dark:border-gray-700">
          <div className="flex-1 flex items-center gap-3">
            <input
              type="radio"
              name="shipping_method"
              defaultChecked={
                selectedMethod === "standard" || selectedMethod === null
              }
              id="standard"
              value="standard"
            />
            <label htmlFor="standard" className="w-full py-3">
              Standard
              <span className="ml-2 text-neutral-600 dark:text-neutral-400">
                (4-7 working days)
              </span>
            </label>
          </div>
          <strong>{totalPrice >= 50 ? "FREE" : priceFormatter(4.99)}</strong>
        </div>

        <div className="px-4 flex-between">
          <div className="flex-1 flex items-center gap-3">
            <input
              type="radio"
              name="shipping_method"
              defaultChecked={selectedMethod === "express"}
              id="express"
              value="express"
            />
            <label htmlFor="express" className="w-full py-3">
              Express
              <span className="ml-2 text-neutral-600 dark:text-neutral-400">
                (2-4 working days)
              </span>
            </label>
          </div>
          <strong>{priceFormatter(7.99)}</strong>
        </div>
      </div>

      <div className="mt-8 xl:mt-auto flex justify-between">
        <Link
          href="/checkout/information"
          className="button-secondary w-26 flex-center gap-1"
        >
          <FiArrowLeft className="text-[18px]" />
          <span>Back</span>
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
}
