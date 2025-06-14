import CheckoutNavigation from "@/components/checkout/CheckoutNavigation";
import CheckoutShippingForm from "@/components/checkout/CheckoutShippingForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { getUserCart } from "@/lib/actions/cart-actions";
import { getSessionUser } from "@/lib/actions/user-actions";
import { countCartPrice } from "@/lib/utils";

export default async function Page() {
  const user = await getSessionUser();
  const cart = await getUserCart();
  const { totalPrice } = countCartPrice(cart);

  return (
    <>
      <CheckoutNavigation activePage={2} />
      <CheckoutSummary user={user} shipping_method={cart.shipping_method} />
      <CheckoutShippingForm
        selectedMethod={cart.shipping_method}
        totalPrice={totalPrice}
      />
    </>
  );
}
