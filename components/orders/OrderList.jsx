import { dateFormatter, priceFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function OrderList({ order }) {
  const {
    order_id,
    created_at,
    total_price,
    is_delivered,
    delivered_at,
    order_items,
  } = order;

  const orderItemsCount = order_items.reduce(
    (acc, cur) => acc + cur.quantity,
    0,
  );

  return (
    <div className="card-lg flex flex-col gap-4">
      <p className="text-lg font-semibold">
        ORDER #...{order_id.split("-").at(-1).toUpperCase()}
      </p>

      <div className="grid grid-cols-4 text-sm">
        <div className="col-span-3 flex flex-col gap-1">
          <span className="font-semibold">
            {is_delivered ? "DELIVERED" : "PROCESSING"}
          </span>
          <span>
            {is_delivered
              ? `Delivery date: ${dateFormatter(delivered_at)}`
              : `Purchase date: ${dateFormatter(created_at)}`}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {orderItemsCount === 1
              ? "1 product"
              : `${orderItemsCount} products`}
          </span>
          <span className="font-semibold">{priceFormatter(total_price)}</span>
        </div>
      </div>

      <hr className="border-neutral-200 dark:border-neutral-700" />

      <div className="flex-between mt-1 gap-4">
        <div className="w-full overflow-x-auto rounded-sm p-2 dark:bg-neutral-700">
          <div className="flex gap-4">
            {order_items.map((item, i) => (
              <div
                key={i}
                className="relative aspect-square w-[100px] shrink-0"
              >
                <Image
                  src={item.image}
                  alt="Product image"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0">
          <Link href={`/user/orders/${order_id}`} className="button-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
