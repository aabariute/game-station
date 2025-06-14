import OrderPage from "@/components/orders/OrderPage";
import { requireAdmin } from "@/lib/auth-guard";

export default async function Page({ params }) {
  await requireAdmin();

  const { id } = await params;

  return <OrderPage id={id} />;
}
