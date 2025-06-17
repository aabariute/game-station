import { auth } from "@/auth";
import { getUserReview } from "@/lib/actions/review-action";
import { priceFormatter } from "@/lib/utils";
import Image from "next/image";
import OrderReviewButton from "./OrderReviewButton";

export default async function OrderItem({ item }) {
  const { product_id, color, image, brand, title, quantity, total_price } =
    item;
  const review = await getUserReview(product_id);
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  // Set image unavailable if product is deleted
  const imageUrl = product_id
    ? image
    : "https://qzjoaseklvxaztlbgrmt.supabase.co/storage/v1/object/public/product-images//unavailable.PNG";

  return (
    <div className="flex w-full flex-col">
      <div className="flex-between mb-1">
        <h5 className="font-semibold">
          {brand} {title}
        </h5>
        <span className="text-lg font-semibold">
          {priceFormatter(total_price)}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative aspect-square w-[100px]">
          <Image
            src={imageUrl}
            alt="Product image"
            fill
            className="object-contain"
          />
        </div>
        <ul className="flex w-full flex-col text-sm text-neutral-500 dark:text-neutral-400">
          <li className="flex-between w-1/2 sm:w-2/5 md:w-1/4">
            <span>Quantity:</span>
            <span className="text-right">{quantity}</span>
          </li>
          <li className="flex-between w-1/2 sm:w-2/5 md:w-1/4">
            <span>Color:</span>
            <span className="text-right">{color}</span>
          </li>
          <div className="flex-between">
            <li className="flex-between w-1/2 sm:w-2/5 md:w-1/4">
              <span>Price:</span>
              <span className="text-right">{priceFormatter(total_price)}</span>
            </li>
            {!isAdmin && product_id && (
              <OrderReviewButton
                rating={review.rating}
                productId={product_id}
              />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
