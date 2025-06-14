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
        <div className="relative inline-block mt-[-7px] text-[calc(1em/1.35)] text-neutral-400">
          <span>{priceFormatter(price)}</span>
          <span className="absolute w-full h-[1px] bg-neutral-400 rotate-[160deg] left-[0px] top-3/7"></span>
        </div>
      )}
    </div>
  );
}
