import CheckoutNavigation from "@/components/checkout/CheckoutNavigation";
import CheckoutPaymentForm from "@/components/checkout/CheckoutPaymentForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { getUserCart } from "@/lib/actions/cart-actions";
import { getSessionUser } from "@/lib/actions/user-actions";
import { countCartPrice } from "@/lib/utils";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function Page() {
  const user = await getSessionUser();
  if (!user.address) redirect("/checkout/information");

  const cart = await getUserCart();
  const { totalPrice, shippingPrice } = countCartPrice(cart);

  const amount = Math.round((totalPrice + shippingPrice) * 100);

  let client_secret = null;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Initialize stripe instance
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
    });
    client_secret = paymentIntent.client_secret;
  } catch (error) {
    throw new Error(error);
  }

  return (
    <>
      <CheckoutNavigation activePage={3} />
      <CheckoutSummary user={user} shippingMethod={cart.shipping_method} />
      <CheckoutPaymentForm
        clientSecret={client_secret}
        price={(totalPrice + shippingPrice) * 100}
      />
    </>
  );
}
