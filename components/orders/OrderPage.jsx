import { auth } from "@/auth";
import { getOrderById } from "@/lib/actions/order-actions";
import { dateFormatter, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Spinner from "../ui/Spinner";
import MarkAsDeliveredButton from "../admin/MarkAsDeliveredButton";
import OrderItem from "./OrderItem";

export default async function OrderPage({ id }) {
  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  const {
    created_at,
    shipping_address,
    shipping_method,
    discount_amount,
    shipping_price,
    subtotal_price,
    total_price,
    user_contacts,
    is_delivered,
    delivered_at,
    order_items,
  } = order;
  const { country, city, street_address, zip_code } = shipping_address;
  const { email, phone_number } = user_contacts;

  const orderItemsCount = order_items.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );

  return (
    <>
      <div className="grid grid-cols-[auto_auto] md:grid-cols-[100px_auto_100px] mb-8 items-center">
        <Link href={isAdmin ? "/admin/orders" : "/user/orders"}>
          <button className="button-primary flex-between gap-1">
            <FiArrowLeft className="text-[18px]" />
            <span>Orders</span>
          </button>
        </Link>
        <h2 className="md:col-2 text-2xl font-bold uppercase text-right md:text-center">
          Order #...{id.split("-").at(-1).toUpperCase()}
        </h2>
      </div>

      <article className="mb-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-md flex flex-col gap-2">
            <h3 className="font-semibold uppercase text-lg">Order status</h3>
            {is_delivered ? (
              <span className="font-bold text-green-600">DELIVERED</span>
            ) : (
              <span className="font-bold text-orange-600">PROCESSING</span>
            )}
            <div className="w-full text-sm">
              {is_delivered ? (
                <div>
                  <div className="w-3/5 sm:w-2/5 md:w-full flex-between">
                    <span>Delivery date:</span>
                    <span>{dateFormatter(delivered_at)}</span>
                  </div>
                  <div className="w-3/5 sm:w-2/5 md:w-full flex-between">
                    <span>Purchase date:</span>
                    <span>{dateFormatter(created_at)}</span>
                  </div>
                </div>
              ) : (
                <span>Purchase date: {dateFormatter(created_at)}</span>
              )}
            </div>
            {isAdmin && !is_delivered && <MarkAsDeliveredButton orderId={id} />}
          </div>

          <div className="card-md flex flex-col gap-2">
            <h3 className="font-semibold uppercase text-lg">Payment method</h3>
            <span className="text-neutral-500 dark:text-neutral-400">
              Credit Card
            </span>
            <p className="text-sm">Order paid!</p>
          </div>

          <div className="card-md flex flex-col gap-2">
            <h3 className="font-semibold uppercase text-lg">Delivery method</h3>
            <span className="text-neutral-500 dark:text-neutral-400">
              {shipping_method[0].toUpperCase() + shipping_method.slice(1)}
            </span>
            <div className="flex flex-col text-sm">
              <span>{street_address}</span>
              <span>
                {zip_code} {city}
              </span>
              <span>{country}</span>
              <span>{phone_number}</span>
              <span>{email}</span>
            </div>
          </div>
        </div>
      </article>

      <article className="card-lg flex flex-col">
        <h3 className="font-semibold uppercase text-lg">Order details</h3>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {orderItemsCount === 1 ? "1 product" : `${orderItemsCount} products`}
        </span>
        <Suspense fallback={<Spinner />}>
          <div className="mt-5 flex flex-col gap-8">
            {order_items.map((item, i) => (
              <React.Fragment key={i}>
                <OrderItem item={item} />
              </React.Fragment>
            ))}
          </div>
        </Suspense>

        <hr className="border-neutral-200 mt-4 mb-8" />
        <ul className="flex flex-col items-end">
          <li className="w-full md:w-1/2 mb-1 flex-between">
            <span>Subtotal amount</span>
            <span>{priceFormatter(subtotal_price)}</span>
          </li>
          {discount_amount > 0 && (
            <li className="w-full md:w-1/2 mb-1 flex-between">
              <span>Discounts applied</span>
              <span>-{priceFormatter(discount_amount)}</span>
            </li>
          )}
          <li className="w-full md:w-1/2 mb-3 flex-between">
            <span>Delivery</span>
            <span>{priceFormatter(shipping_price)}</span>
          </li>
          <li className="w-full md:w-1/2 flex-between text-lg font-semibold">
            <span>Order amount</span>
            <span>{priceFormatter(total_price)}</span>
          </li>
        </ul>
      </article>
    </>
  );
}
