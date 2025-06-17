"use client";

import { useState } from "react";
import ButtonAddToCart from "./ButtonAddToCart";
import ProductColorSwatches from "./ProductColorSwatches";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

export default function ProductDetails({ product }) {
  const { product_id, title, description, brand } = product;
  const colors = product.variants.map((variant) => variant.color);

  const [displayedVariant, setDisplayedVariant] = useState(product.variants[0]);
  const { images, price, discount, stock } = displayedVariant;

  return (
    <section className="grid gap-x-6 gap-y-8 lg:grid-cols-[4fr_3fr]">
      <ProductImage images={images} discount={discount} />

      <article className="flex h-full flex-col lg:pt-4 lg:pb-22">
        <h2 className="mb-2 text-2xl font-medium md:mb-6 md:text-3xl lg:text-4xl">
          {brand} {title}
        </h2>

        <ProductPrice
          price={price}
          discount={discount}
          fontSize="text-xl md:text-2xl"
        />

        {colors.length > 1 && (
          <div className="mt-6 flex items-center gap-x-2 lg:mt-4">
            <span className="mr-3">Available Colors:</span>
            <ProductColorSwatches
              colors={colors}
              variants={product.variants}
              setDisplayedVariant={setDisplayedVariant}
            />
          </div>
        )}

        <p className="mt-6 text-sm lg:mt-6">{description}</p>

        {stock > 0 ? (
          <>
            <p className="mt-8 mb-1 text-center text-sm lg:mt-auto">
              In stock. Ready to ship
            </p>

            <ButtonAddToCart
              className="w-full"
              variantId={displayedVariant.variant_id}
              productId={product_id}
            />
          </>
        ) : (
          <p className="mt-6 mb-1 text-center font-medium text-red-600 lg:mt-auto">
            SOLD OUT
          </p>
        )}
      </article>
    </section>
  );
}
