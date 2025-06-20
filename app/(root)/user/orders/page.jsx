import { auth } from "@/auth";
import OrderList from "@/components/orders/OrderList";
import { getUserOrders } from "@/lib/actions/order-actions";
import React from "react";

export const metadata = {
  title: "Orders",
};

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const orders = await getUserOrders(session.user.id);

  if (!orders?.length) {
    return (
      <div className="card-lg flex-center flex-col gap-4 py-10">
        <h3 className="text-xl font-semibold">No orders yet</h3>
        <p className="text-primary-600">Go to store to place an order.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6">
      {orders?.length > 0 &&
        orders.map((order) => (
          <React.Fragment key={order.order_id}>
            <OrderList order={order} />
          </React.Fragment>
        ))}
    </div>
  );
}
