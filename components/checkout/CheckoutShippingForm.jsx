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
        className="button-primary flex-center w-26 gap-1"
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

      <div className="border-primary-300 rounded-md border shadow-sm">
        <div className="flex-between border-primary-300 border-b px-4">
          <div className="flex flex-1 items-center gap-3">
            <input
              type="radio"
              id="standard"
              name="shipping_method"
              defaultChecked={
                selectedMethod === "standard" || selectedMethod === null
              }
              value="standard"
            />
            <label htmlFor="standard" className="w-full py-3">
              Standard
              <span className="text-primary-600 ml-2">(4-7 working days)</span>
            </label>
          </div>
          <strong>{totalPrice >= 50 ? "FREE" : priceFormatter(4.99)}</strong>
        </div>

        <div className="flex-between px-4">
          <div className="flex flex-1 items-center gap-3">
            <input
              type="radio"
              id="express"
              name="shipping_method"
              defaultChecked={selectedMethod === "express"}
              value="express"
            />
            <label htmlFor="express" className="w-full py-3">
              Express
              <span className="text-primary-600 ml-2">(2-4 working days)</span>
            </label>
          </div>
          <strong>{priceFormatter(7.99)}</strong>
        </div>
      </div>

      <div className="mt-8 flex justify-between xl:mt-auto">
        <Link
          href="/checkout/information"
          className="button-secondary flex-center w-26 gap-1"
        >
          <FiArrowLeft className="text-[18px]" />
          <span>Back</span>
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
}
