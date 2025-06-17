import { getUserOrders } from "@/lib/actions/order-actions";
import { getUserById } from "@/lib/actions/user-actions";
import { capitalize, dateFormatter, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

export default async function Page({ params }) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) notFound();
  const orders = await getUserOrders(id);

  const { name, email, address, phone_number, created_at, role } = user;

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-8 grid grid-cols-[100px_auto] items-center md:grid-cols-[100px_auto_100px]">
        <Link href="/admin/users" className="button-primary flex-between gap-1">
          <FiArrowLeft className="text-[18px]" />
          <span>Users</span>
        </Link>
        <h2 className="text-right text-2xl font-bold uppercase md:col-2 md:text-center">
          User #...{id.split("-").at(-1).toUpperCase()}
        </h2>
      </div>

      <article className="mb-14 grid gap-6 md:grid-cols-3">
        <div className="card-md flex flex-col gap-2">
          <h3 className="text-lg font-semibold uppercase">Identity</h3>
          <div className="text-sm">
            <div className="flex-between">
              <span>Name:</span>
              <span>{name}</span>
            </div>
            <div className="flex-between">
              <span>Signed up at:</span>
              <span>{dateFormatter(created_at)}</span>
            </div>
            <div className="flex-between">
              <span>Role:</span>
              <span>{capitalize(role)}</span>
            </div>
          </div>
        </div>

        <div className="card-md flex flex-col gap-2">
          <h3 className="text-lg font-semibold uppercase">Contacts</h3>
          <div className="flex flex-col text-sm">
            <span>{email}</span>
            {phone_number && <span>{phone_number}</span>}
          </div>
        </div>

        <div className="card-md flex flex-col gap-2">
          <h3 className="text-lg font-semibold uppercase">Address</h3>
          {address && (
            <div className="flex flex-col text-sm">
              <span>{address.street_address}</span>
              <span>
                {address.zip_code} {address.city}
              </span>
              <span>{address.country}</span>
            </div>
          )}
        </div>
      </article>

      <h2 className="mb-6 text-center text-xl font-bold uppercase">
        User orders
      </h2>

      {(!orders || orders.length) === 0 && (
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          User has not placed any orders yet.
        </p>
      )}

      {orders?.length > 0 && (
        <table className="w-full border-separate rounded-lg border border-gray-300 text-sm dark:border-gray-700 dark:bg-neutral-800">
          <thead>
            <tr>
              <th className="py-3 pl-4 text-left">ID</th>
              <th className="py-3 text-left">DATE</th>
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
      )}
    </section>
  );
}
