"use client";

import { addItemToCart } from "@/lib/actions/cart-actions";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ButtonAddToCart({
  productId,
  variantId,
  buttonText = "Add to Cart",
  className,
}) {
  async function handleAddToCart() {
    const res = await addItemToCart(productId, variantId);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
  }

  return (
    <button
      onClick={handleAddToCart}
      className={cn("button-primary", className)}
    >
      {buttonText}
    </button>
  );
}
