import { auth } from "@/auth";
import { getOrderById } from "@/lib/actions/order-actions";
import { capitalize, dateFormatter, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { FiArrowLeft } from "react-icons/fi";
import MarkAsDeliveredButton from "../admin/MarkAsDeliveredButton";
import Spinner from "../ui/Spinner";
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
    0,
  );

  return (
    <>
      <div className="mb-8 grid grid-cols-[auto_auto] items-center md:grid-cols-[100px_auto_100px]">
        <Link
          href={isAdmin ? "/admin/orders" : "/user/orders"}
          className="button-primary flex-between gap-1"
        >
          <FiArrowLeft className="text-[18px]" />
          <span>Orders</span>
        </Link>
        <h2 className="text-right text-2xl font-bold uppercase md:col-2 md:text-center">
          Order #...{id.split("-").at(-1).toUpperCase()}
        </h2>
      </div>

      <article className="mb-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-md flex flex-col gap-2">
            <h3 className="text-lg font-semibold uppercase">Order status</h3>
            {is_delivered ? (
              <span className="font-bold text-green-600">DELIVERED</span>
            ) : (
              <span className="font-bold text-orange-600">PROCESSING</span>
            )}
            <div className="w-full text-sm">
              {is_delivered ? (
                <div>
                  <div className="flex-between w-3/5 sm:w-2/5 md:w-full">
                    <span>Delivery date:</span>
                    <span>{dateFormatter(delivered_at)}</span>
                  </div>
                  <div className="flex-between w-3/5 sm:w-2/5 md:w-full">
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
            <h3 className="text-lg font-semibold uppercase">Payment method</h3>
            <span className="text-primary-600">Credit Card</span>
            <p className="text-sm">Order paid!</p>
          </div>

          <div className="card-md flex flex-col gap-2">
            <h3 className="text-lg font-semibold uppercase">Delivery method</h3>
            <span className="text-primary-600">
              {capitalize(shipping_method)}
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
        <h3 className="text-lg font-semibold uppercase">Order details</h3>
        <span className="text-primary-600 text-sm">
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

        <hr className="border-primary-300 mt-4 mb-8" />
        <ul className="flex flex-col items-end">
          <li className="flex-between mb-1 w-full md:w-1/2">
            <span>Subtotal amount</span>
            <span>{priceFormatter(subtotal_price)}</span>
          </li>
          {discount_amount > 0 && (
            <li className="flex-between mb-1 w-full md:w-1/2">
              <span>Discounts applied</span>
              <span>-{priceFormatter(discount_amount)}</span>
            </li>
          )}
          <li className="flex-between mb-3 w-full md:w-1/2">
            <span>Delivery</span>
            <span>{priceFormatter(shipping_price)}</span>
          </li>
          <li className="flex-between w-full text-lg font-semibold md:w-1/2">
            <span>Order amount</span>
            <span>{priceFormatter(total_price)}</span>
          </li>
        </ul>
      </article>
    </>
  );
}
