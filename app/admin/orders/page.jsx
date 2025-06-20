import ActionIcon from "@/components/admin/ActionIcon";
import SortBy from "@/components/admin/SortBy";
import Pagination from "@/components/Pagination";
import { getAllOrders } from "@/lib/actions/order-actions";
import { PAGE_SIZE } from "@/lib/constants";
import { dateFormatter, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export const metadata = {
  title: "Orders",
};

const sortOptions = [
  { value: "date-desc", label: "Order date: newest - oldest" },
  { value: "date-asc", label: "Order date: oldest - newest" },
  { value: "delivery-desc", label: "Delivery date: newest - oldest" },
  { value: "delivery-asc", label: "Delivery date: oldest - newest" },
];

export default async function Page({ searchParams }) {
  const { page = "1", sort } = await searchParams;
  const { orders, total, totalPages } = await getAllOrders(
    page,
    PAGE_SIZE,
    sort,
  );

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold tracking-wide uppercase">
        Orders
      </h2>

      <div className="mb-4 flex justify-end">
        <SortBy sortOptions={sortOptions} />
      </div>

      <table className="border-primary-300 dark:bg-primary-200 w-full border-separate rounded-lg border text-sm">
        <thead>
          <tr>
            <th className="py-3 pl-4 text-left">ID</th>
            <th className="py-3 text-left">DATE</th>
            <th className="py-3 text-left">BUYER</th>
            <th className="py-3 text-left">TOTAL</th>
            <th className="py-3 text-left">DELIVERED</th>
            <th className="py-3 pr-4 text-center">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="border-primary-300 min-w-[180px] border-t py-2 pr-3 pl-4">
                <Link
                  href={`/admin/orders/${order.order_id}`}
                  className="hover:text-primary-700"
                >
                  {order.order_id}
                </Link>
              </td>
              <td className="border-primary-300 border-t py-2 pr-3 text-nowrap">
                {dateFormatter(order.created_at)}
              </td>
              <td className="border-primary-300 min-w-[150px] border-t py-2 pr-3">
                <Link
                  href={`/admin/users/${order.user_id}`}
                  className="hover:text-primary-700"
                >
                  {order.user_id}
                </Link>
              </td>
              <td className="border-primary-300 border-t py-2 pr-3 text-nowrap">
                {priceFormatter(order.total_price)}
              </td>
              <td className="border-primary-300 border-t py-2 pr-3 text-nowrap">
                {order.is_delivered && order.delivered_at ? (
                  dateFormatter(order.delivered_at)
                ) : (
                  <span className="font-medium text-red-600 dark:text-red-500">
                    Not delivered
                  </span>
                )}
              </td>
              <td className="border-primary-300 border-t py-2 pr-4 text-center align-middle">
                <div className="flex-center">
                  <ActionIcon href={`/admin/orders/${order.order_id}`}>
                    <FaEye className="text-[16px]" />
                  </ActionIcon>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </section>
  );
}
