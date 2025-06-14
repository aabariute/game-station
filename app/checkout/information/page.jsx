import CheckoutContactForm from "@/components/checkout/CheckoutContactForm";
import CheckoutNavigation from "@/components/checkout/CheckoutNavigation";

export default async function Page() {
  return (
    <>
      <CheckoutNavigation activePage={1} />
      <CheckoutContactForm />
    </>
  );
}
