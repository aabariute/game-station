import CheckoutAside from "@/components/checkout/CheckoutAside";
import Logo from "@/components/header/Logo";
import { getUserCart } from "@/lib/actions/cart-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout",
};

export default async function Layout({ children }) {
  // perkelt i aside?
  const cart = await getUserCart();
  if (!cart || cart?.cart_items.length === 0) redirect("/");

  return (
    <>
      <header className="h-[58px] bg-white/90 dark:bg-neutral-900/90 px-6 flex shadow-md items-center sticky top-0 inset-x-0 z-50">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col-reverse xl:grid xl:grid-cols-[minmax(700px,_3fr)_minmax(500px,_2fr)]">
        <section className="flex flex-col p-4 md:p-6 xl:pr-8 xl:pl-20">
          {children}
        </section>
        <CheckoutAside cart={cart} />
      </main>
    </>
  );
}
