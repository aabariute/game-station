import { countAccruedDiscount } from "@/lib/utils";
import Image from "next/image";
import ProductPrice from "../product/ProductPrice";

export default function ProductCard({ item }) {
  const {
    quantity,
    brand,
    title,
    color,
    price,
    image,
    discount,
    additional_discount,
  } = item;
  const accruedDiscount = countAccruedDiscount(discount, additional_discount);

  return (
    <li className="mb-4 grid grid-cols-[75px_1fr] gap-4 pb-4">
      <div className="rounded-md border border-pink-600/30 bg-white p-1 shadow-xs">
        <Image
          width={100}
          height={100}
          src={image}
          alt={title}
          className="aspect-square object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span>
          {brand} {title}
        </span>
        <span className="text-xs font-light">Color: {color}</span>
        <div className="flex-between">
          <span className="text-xs font-light">Qty: {quantity} </span>
          <ProductPrice
            price={price}
            discount={accruedDiscount}
            fontSize="text-base"
          />
        </div>
      </div>
    </li>
  );
}
