import { truncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import ProductPrice from "../product/ProductPrice";
import ChangeQuantityButton from "./ChangeQuantityButton";

export default function ProductCard({ item, onDelete }) {
  const {
    id: cart_items_id,
    product_id,
    variant_id,
    quantity,
    brand,
    title,
    color,
    price,
    image,
    discount,
  } = item;

  return (
    <li className="grid grid-cols-[75px_1fr] gap-4 pb-4 mb-4">
      <Link
        href={`/products/${product_id}`}
        className="border border-pink-600/30 dark:border-pink-400/50 p-1 rounded-md shadow-xs bg-white/10"
      >
        <Image
          width={100}
          height={100}
          src={image}
          alt={title}
          className="object-contain aspect-square"
        />
      </Link>

      <div className="flex flex-col">
        <div className="flex-between">
          <Link href={`/products/${product_id}`} className="hover-fade-text">
            {truncate(`${brand} ${title}`, 35)}
          </Link>
          <FaTrash
            onClick={() => onDelete(cart_items_id)}
            className="hover-fade-text text-[15px]"
          />
        </div>

        <span className="text-xs font-light">Color: {color}</span>

        <div className="mt-auto flex-between">
          <div className="flex gap-2 items-center">
            <ChangeQuantityButton
              cartItemsId={cart_items_id}
              productId={product_id}
              variantId={variant_id}
              quantity={quantity}
            />
            <span className="text-xs font-light">In stock</span>
          </div>

          <ProductPrice
            price={price * quantity}
            discount={discount}
            fontSize="text-base"
          />
        </div>
      </div>
    </li>
  );
}
