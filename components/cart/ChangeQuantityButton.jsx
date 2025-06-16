import {
  addItemToCart,
  decreaseCartItemsQuantity,
} from "@/lib/actions/cart-actions";
import { useTransition } from "react";
import SpinnerMini from "../ui/SpinnerMini";

export default function ChangeQuantityButton({
  cartItemsId,
  productId,
  variantId,
  quantity,
}) {
  const [isPending, startTransition] = useTransition();

  function handleIncreaseQuantity() {
    startTransition(() => addItemToCart(productId, variantId));
  }

  function handleDecreaseQuantity() {
    startTransition(() =>
      decreaseCartItemsQuantity(cartItemsId, productId, variantId)
    );
  }

  return (
    <div className="grid grid-cols-3 items-center border border-pink-600/30 dark:border-pink-400/50 rounded-full shadow-xs">
      <button
        className={`w-[24px] aspect-square cursor-pointer text-base rounded-full flex-center transition-colors duration-300 hover:bg-pink-600/10 dark:hover:bg-pink-600/40 ${isPending ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-700" : ""}`}
        onClick={handleDecreaseQuantity}
        disabled={isPending}
      >
        <span>&#8722;</span>
      </button>

      <span className="flex-center text-xs font-medium">
        {isPending ? <SpinnerMini /> : <span>{quantity}</span>}
      </span>

      <button
        className={`w-[24px] aspect-square cursor-pointer text-base rounded-full flex-center transition-colors duration-300 hover:bg-pink-600/10 dark:hover:bg-pink-600/40 ${isPending ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-700" : ""}`}
        onClick={handleIncreaseQuantity}
        disabled={isPending}
      >
        <span>&#43;</span>
      </button>
    </div>
  );
}
