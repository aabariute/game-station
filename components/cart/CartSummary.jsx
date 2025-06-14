import { priceFormatter } from "@/lib/utils";

export default function CartSummary({
  subtotalPrice,
  defaultDiscount,
  totalPrice,
}) {
  return (
    <div className="mt-auto pt-4 mb-6 mx-3 grid grid-cols-2 items-center gap-y-2 text-sm">
      {defaultDiscount !== 0 && (
        <>
          <span>Subtotal:</span>
          <span className="text-right text-base">
            {priceFormatter(subtotalPrice)}
          </span>

          <span>Discount:</span>
          <span className="text-right text-base">
            -{priceFormatter(defaultDiscount)}
          </span>
        </>
      )}
      <span className="text-base">Total:</span>
      <span className="text-right text-base">{priceFormatter(totalPrice)}</span>
    </div>
  );
}
