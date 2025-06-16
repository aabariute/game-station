"use client";

export default function ProductColorSwatches({
  colors,
  variants,
  setDisplayedVariant,
}) {
  return (
    <>
      {colors.map((color) => (
        <button
          key={color}
          className="border-2 border-neutral-900 dark:border-neutral-200 w-[32px] h-[32px] rounded-full cursor-pointer hover:scale-105 transition duration-200"
          style={{ backgroundColor: `${color}` }}
          onClick={() =>
            setDisplayedVariant(
              variants.find((variant) => variant.color === color)
            )
          }
        ></button>
      ))}
    </>
  );
}
