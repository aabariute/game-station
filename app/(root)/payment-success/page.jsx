import { clearCart } from "@/lib/actions/cart-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const metadata = {
  title: "Thank You",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function page({ searchParams }) {
  const { payment_intent: paymentIntentId, id: orderId } = await searchParams;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const isSuccess = paymentIntent.status === "succeeded";
  if (!isSuccess) return redirect("/");

  await clearCart();

  return (
    <main className="flex-1 flex-center flex-col gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold my-1">Thanks for your purchase</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          We are processing your order.
        </p>
      </div>

      <button className="button-primary">
        <Link href={`/user/orders/${orderId}`}>View order</Link>
      </button>
    </main>
  );
}
