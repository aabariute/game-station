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
        <div className="text-primary-500 relative mt-[-7px] inline-block text-[calc(1em/1.35)]">
          <span>{priceFormatter(price)}</span>
          <span className="bg-primary-500 absolute top-3/7 left-[0px] h-[1px] w-full rotate-[160deg]"></span>
        </div>
      )}
    </div>
  );
}
