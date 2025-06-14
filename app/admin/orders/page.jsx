import SortBy from "@/components/admin/SortBy";
import Pagination from "@/components/Pagination";
import { getAllOrders } from "@/lib/actions/order-actions";
import { requireAdmin } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { dateFormatter, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export const metadata = {
  title: "Orders",
};

const sortOptions = [
  { value: "date-desc", label: "Date: newest - oldest" },
  { value: "date-asc", label: "Date: oldest - newest" },
  { value: "delivery-desc", label: "Delivery: newest - oldest" },
  { value: "delivery-asc", label: "Delivery: oldest - newest" },
];

export default async function Page({ searchParams }) {
  await requireAdmin();

  const { page = "1", sort } = await searchParams;
  const { orders, total, totalPages } = await getAllOrders(
    page,
    PAGE_SIZE,
    sort
  );

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold uppercase text-center tracking-wide">
        Orders
      </h2>

      <div className="flex justify-end mb-4">
        <SortBy sortOptions={sortOptions} />
      </div>

      <table className="w-full border border-gray-300 dark:border-gray-700 dark:bg-neutral-800 border-separate rounded-lg text-sm">
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
              <td className="border-t min-w-[180px] border-gray-300 dark:border-gray-700 py-2 pl-4 pr-3">
                <Link
                  href={`/admin/orders/${order.order_id}`}
                  className="hover:text-neutral-500 dark:hover:text-neutral-300"
                >
                  {order.order_id}
                </Link>
              </td>
              <td className="text-nowrap border-t border-gray-300 dark:border-gray-700 py-2 pr-3">
                {dateFormatter(order.created_at)}
              </td>
              <td className="border-t min-w-[150px] border-gray-300 dark:border-gray-700 py-2 pr-3">
                <Link
                  href={`/admin/users/${order.user_id}`}
                  className="hover:text-neutral-500 dark:hover:text-neutral-300"
                >
                  {order.user_id}
                </Link>
              </td>
              <td className="text-nowrap border-t border-gray-300 dark:border-gray-700 py-2 pr-3">
                {priceFormatter(order.total_price)}
              </td>
              <td className="text-nowrap border-t border-gray-300 dark:border-gray-700 py-2 pr-3">
                {order.is_delivered && order.delivered_at ? (
                  dateFormatter(order.delivered_at)
                ) : (
                  <span className="text-red-600 dark:text-red-500 font-medium">
                    Not delivered
                  </span>
                )}
              </td>
              <td className="text-center align-middle border-t border-gray-300 dark:border-gray-700 py-2 pr-4">
                <Link href={`/admin/orders/${order.order_id}`}>
                  <button className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    <FaEye className="text-[16px]" />
                  </button>
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
