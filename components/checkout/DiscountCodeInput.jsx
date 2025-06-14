"use client";

import { updateCartDiscount } from "@/lib/actions/cart-actions";
import { useForm } from "react-hook-form";
import { IoCloseCircleSharp } from "react-icons/io5";
import SpinnerMini from "../ui/SpinnerMini";

export default function DiscountCodeInput({ cart_id, isDiscountApplied }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit(data) {
    if (data.discountCode.trim().toLowerCase() !== "app15")
      return setError("discountCode", { message: "Invalid discount code" });

    const res = await updateCartDiscount(cart_id, 15);
    reset();
  }

  return (
    <div className="mt-4 mb-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <input
          className="input py-auto"
          {...register("discountCode", { required: false })}
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

            <div className="flex items-center gap-1">
              <span className="font-semibold">APP15</span>
              <button
                onClick={async () => await updateCartDiscount(cart_id, null)}
              >
                <IoCloseCircleSharp
                  title="Remove discount code"
                  className="text-[20px] my-auto text-neutral-700 cursor-pointer hover:text-red-700"
                />
              </button>
            </div>
          </div>
        )}

        {errors.discountCode && (
          <div className="text-red-600">{errors.discountCode.message}</div>
        )}
      </div>
    </div>
  );
}
