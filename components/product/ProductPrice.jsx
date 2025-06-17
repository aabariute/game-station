import { calcPriceAfterDiscount, priceFormatter } from "@/lib/utils";

export default function ProductPrice({
  price,
  discount,
  fontSize = "text-lg",
}) {
  const priceAfterDiscount = calcPriceAfterDiscount(price, discount);

  return (
    <div className={`${fontSize} flex items-center gap-1`}>
      <span>{priceFormatter(priceAfterDiscount)}</span>

      {discount && (
        <div className="relative mt-[-7px] inline-block text-[calc(1em/1.35)] text-neutral-400">
          <span>{priceFormatter(price)}</span>
          <span className="absolute top-3/7 left-[0px] h-[1px] w-full rotate-[160deg] bg-neutral-400"></span>
        </div>
      )}
    </div>
  );
}
