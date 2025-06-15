"use client";

import { updateCartDiscount } from "@/lib/actions/cart-actions";
import { useForm } from "react-hook-form";
import { IoCloseCircleSharp } from "react-icons/io5";
import SpinnerMini from "../ui/SpinnerMini";

export default function DiscountCodeInput({ cartId, isDiscountApplied }) {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onSubmit", reValidateMode: "onChange" | "onBlur" });

  async function onSubmit(data) {
    await updateCartDiscount(cartId, 15);
    reset();
  }

  return (
    <div className="mt-4 mb-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <input
          className="input py-auto"
          {...register("discountCode", {
            required: false,
            validate: (value) => {
              if (!value) return true;
              return (
                value.trim().toLowerCase() === "app15" ||
                "Invalid discount code"
              );
            },
            onChange: () => clearErrors("discountCode"),
          })}
          disabled={isSubmitting || isDiscountApplied}
          placeholder="Discount code"
        />
        <button
          type="submit"
          disabled={isSubmitting || isDiscountApplied}
          className="button-primary w-26"
        >
          {isSubmitting ? <SpinnerMini /> : "Apply"}
        </button>
      </form>
      <div className="mt-2 text-sm h-[1rem]">
        {isDiscountApplied && (
          <div className="text-green-600 flex-between">
            <span>Discount successfully applied</span>

            <div className="flex items-center gap-2">
              <span className="font-semibold">APP15</span>
              <IoCloseCircleSharp
                title="Remove discount code"
                className="text-[20px] hover-fade-text"
                onClick={async () => await updateCartDiscount(cartId, null)}
              />
            </div>
          </div>
        )}

        {isSubmitted && errors.discountCode && (
          <div className="text-red-600">{errors.discountCode.message}</div>
        )}
      </div>
    </div>
  );
}
