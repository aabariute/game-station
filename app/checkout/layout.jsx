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
      <header className="sticky inset-x-0 top-0 z-50 flex h-[58px] items-center bg-white/90 px-6 shadow-md dark:bg-[#0f0f12]/90">
        <Logo />
      </header>

      <main className="flex flex-1 flex-col-reverse xl:grid xl:grid-cols-[minmax(700px,_3fr)_minmax(500px,_2fr)]">
        <section className="flex flex-col p-4 md:p-6 xl:pr-8 xl:pl-20">
          {children}
        </section>
        <CheckoutAside cart={cart} />
      </main>
    </>
  );
}
