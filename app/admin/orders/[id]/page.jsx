import OrderPage from "@/components/orders/OrderPage";

export default async function Page({ params }) {
  const { id } = await params;

  return <OrderPage id={id} />;
}
