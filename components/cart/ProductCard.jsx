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
    <li className="mb-4 grid grid-cols-[75px_1fr] gap-4 pb-4">
      <Link
        href={`/products/${product_id}`}
        className="rounded-md border border-pink-600/30 bg-white/10 p-1 shadow-xs dark:border-pink-400/50"
      >
        <Image
          width={100}
          height={100}
          src={image}
          alt={title}
          className="aspect-square object-contain"
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

        <div className="flex-between mt-auto">
          <div className="flex items-center gap-2">
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
