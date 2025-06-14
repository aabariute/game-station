"use client";

import { addItemToCart } from "@/lib/actions/cart-actions";
import { cn } from "@/lib/utils";
// import { toast } from "sonner";

export default function ButtonAddToCart({
  productId,
  variantId,
  buttonText = "Add to Cart",
  className,
}) {
  async function handleAddToCart() {
    const res = await addItemToCart(productId, variantId);

    if (res.success) {
      // handle success and error
    }
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
