import OrderPage from "@/components/orders/OrderPage";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <section className="w-full max-w-4xl mx-auto">
      <OrderPage id={id} />;
    </section>
  );
}
