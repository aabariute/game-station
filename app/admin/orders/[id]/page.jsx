import OrderPage from "@/components/orders/OrderPage";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <section className="mx-auto w-full max-w-4xl">
      <OrderPage id={id} />;
    </section>
  );
}
