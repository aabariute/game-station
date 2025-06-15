import { getUserOrders } from "@/lib/actions/order-actions";
import { getUserById } from "@/lib/actions/user-actions";
import { dateFormatter, priceFormatter } from "@/lib/utils";
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
    <section className="max-w-[62rem] mx-auto">
      <div className="grid grid-cols-[100px_auto] md:grid-cols-[100px_auto_100px] mb-8 items-center">
        <Link href="/admin/users" className="button-primary flex-between gap-1">
          <FiArrowLeft className="text-[18px]" />
          <span>Users</span>
        </Link>
        <h2 className="md:col-2 text-2xl font-bold uppercase text-right md:text-center">
          User #...{id.split("-").at(-1).toUpperCase()}
        </h2>
      </div>

      <article className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="card-md flex flex-col gap-2">
          <h3 className="font-semibold uppercase text-lg">Identity</h3>
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
              <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </div>
          </div>
        </div>

        <div className="card-md flex flex-col gap-2">
          <h3 className="font-semibold uppercase text-lg">Contacts</h3>
          <div className="flex flex-col text-sm">
            <span>{email}</span>
            {phone_number && <span>{phone_number}</span>}
          </div>
        </div>

        <div className="card-md flex flex-col gap-2">
          <h3 className="font-semibold uppercase text-lg">Address</h3>
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

      <h2 className="text-xl font-bold uppercase text-center mb-6">
        User orders
      </h2>

      {(!orders || orders.length) === 0 && (
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          No orders made.
        </p>
      )}

      {orders?.length > 0 && (
        <table className="w-full border border-gray-300 dark:border-gray-700 dark:bg-neutral-800 border-separate rounded-lg text-sm">
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
      )}
    </section>
  );
}
