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

      <table className="w-full border-separate rounded-lg border border-gray-300 text-sm dark:border-gray-700 dark:bg-neutral-800">
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
              <td className="min-w-[180px] border-t border-gray-300 py-2 pr-3 pl-4 dark:border-gray-700">
                <Link
                  href={`/admin/orders/${order.order_id}`}
                  className="hover:text-neutral-500 dark:hover:text-neutral-300"
                >
                  {order.order_id}
                </Link>
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {dateFormatter(order.created_at)}
              </td>
              <td className="min-w-[150px] border-t border-gray-300 py-2 pr-3 dark:border-gray-700">
                <Link
                  href={`/admin/users/${order.user_id}`}
                  className="hover:text-neutral-500 dark:hover:text-neutral-300"
                >
                  {order.user_id}
                </Link>
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {priceFormatter(order.total_price)}
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {order.is_delivered && order.delivered_at ? (
                  dateFormatter(order.delivered_at)
                ) : (
                  <span className="font-medium text-red-600 dark:text-red-500">
                    Not delivered
                  </span>
                )}
              </td>
              <td className="border-t border-gray-300 py-2 pr-4 text-center align-middle dark:border-gray-700">
                <Link
                  href={`/admin/orders/${order.order_id}`}
                  className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <FaEye className="text-[16px]" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </section>
  );
}
