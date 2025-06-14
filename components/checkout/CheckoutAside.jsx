import { countCartPrice, priceFormatter } from "@/lib/utils";
import DiscountCodeInput from "./DiscountCodeInput";
import ProductCard from "./ProductCard";

export default async function CheckoutAside({ cart }) {
  const {
    subtotalPrice,
    defaultDiscount,
    additionalDiscount,
    totalPrice,
    shippingPrice,
  } = countCartPrice(cart);
  const isDiscountApplied = additionalDiscount > 0;

  return (
    <aside className="flex flex-col p-4 md:p-6 xl:pl-8 xl:pr-20 xl:h-full bg-neutral-100 dark:bg-neutral-800">
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700 overflow-y-auto max-h-[330px]">
        {cart.cart_items.map((item) => (
          <ProductCard
            key={`${item.product_id}%${item.variant_id}`}
            item={item}
          />
        ))}
      </div>

      <DiscountCodeInput
        cartId={cart.id}
        isDiscountApplied={isDiscountApplied}
      />

      <div className="mt-6 text-sm">
        <div className="grid grid-cols-[3fr_1fr] items-end gap-y-2">
          <span>Subtotal</span>
          <span className="text-right">{priceFormatter(subtotalPrice)}</span>

          {defaultDiscount > 0 && (
            <>
              <span>Discounts</span>
              <span className="text-right">
                -${priceFormatter(defaultDiscount)}
              </span>
            </>
          )}

          {isDiscountApplied && (
            <>
              <span className="text-green-600">APP15 (-15%)</span>
              <span className="text-right text-green-600">
                -{priceFormatter(additionalDiscount)}
              </span>
            </>
          )}

          <span>Shipping</span>
          <span className="text-right">{priceFormatter(shippingPrice)}</span>
        </div>

        <div className="mt-6 text-lg font-semibold flex-between">
          <span>Total</span>
          <span>{priceFormatter(totalPrice + shippingPrice)}</span>
        </div>
      </div>
    </aside>
  );
}
