import Charts from "@/components/admin/Charts";
import { getOrderSummary } from "@/lib/actions/order-actions";
import { dateFormatter, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { AiOutlineDollar } from "react-icons/ai";
import { BiBarcodeReader } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";

export const metadata = {
  title: "Overview",
};

export default async function Page() {
  const summary = await getOrderSummary();

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold tracking-wide uppercase">
        Dashboard
      </h2>

      <article className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card-md">
          <div className="flex-between pb-4">
            <h3 className="text-lg font-medium">Total Revenue</h3>
            <AiOutlineDollar className="text-[25px]" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {priceFormatter(summary.totalSales || 0)}
            </div>
          </div>
        </div>

        <div className="card-md">
          <div className="flex-between pb-4">
            <h3 className="text-lg font-medium">Sales</h3>
            <HiOutlineCreditCard className="text-[25px]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{summary.ordersCount}</div>
          </div>
        </div>

        <div className="card-md">
          <div className="flex-between pb-4">
            <h3 className="text-lg font-medium">Customers</h3>
            <LuUsers className="text-[25px]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{summary.usersCount}</div>
          </div>
        </div>

        <div className="card-md">
          <div className="flex-between pb-4">
            <h3 className="text-lg font-medium">Products</h3>
            <BiBarcodeReader className="text-[25px]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{summary.productsCount}</div>
          </div>
        </div>
      </article>

      <article className="flex flex-col gap-y-4 lg:grid lg:grid-cols-7 lg:gap-x-4">
        <div className="card-md col-span-4">
          <h4 className="mb-6 text-xl font-medium">Overview</h4>
          <Charts data={summary.monthlySales} />
        </div>

        <div className="card-md col-span-3">
          <h4 className="mb-6 text-xl font-medium">Recent Sales</h4>

          <table className="w-full border-separate rounded-lg border border-gray-300 text-sm dark:border-gray-500 dark:bg-neutral-600">
            <thead>
              <tr>
                <th className="py-3 pl-4 text-left">BUYER</th>
                <th className="py-3 text-left">DATE</th>
                <th className="py-3 text-left">TOTAL</th>
                <th className="py-3 pr-4 text-center">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {summary.latestOrders.map((order) => (
                <tr key={order.order_id}>
                  <td className="border-t border-gray-300 py-2 pr-3 pl-4 dark:border-gray-500">
                    {order.user_id}
                  </td>
                  <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-500">
                    {dateFormatter(order.created_at)}
                  </td>
                  <td className="border-t border-gray-300 py-2 pr-3 dark:border-gray-500">
                    {priceFormatter(order.total_price || 0)}
                  </td>
                  <td className="border-t border-gray-300 py-2 pr-4 text-center dark:border-gray-500">
                    <Link
                      href={`/admin/orders/${order.order_id}`}
                      className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100"
                    >
                      <FaEye className="text-[16px]" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
