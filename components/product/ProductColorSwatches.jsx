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
          className="h-[32px] w-[32px] cursor-pointer rounded-full border-2 border-neutral-900 transition duration-200 hover:scale-105 dark:border-neutral-200"
          style={{ backgroundColor: `${color}` }}
          onClick={() =>
            setDisplayedVariant(
              variants.find((variant) => variant.color === color),
            )
          }
        ></button>
      ))}
    </>
  );
}
