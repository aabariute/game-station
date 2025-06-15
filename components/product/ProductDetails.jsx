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
    <section className="grid lg:grid-cols-[4fr_3fr] gap-x-6 gap-y-8">
      <ProductImage images={images} discount={discount} />

      <article className="h-full lg:pt-4 lg:pb-22 flex flex-col">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-2 md:mb-6">
          {brand} {title}
        </h2>

        <ProductPrice
          price={price}
          discount={discount}
          fontSize="text-xl md:text-2xl"
        />

        <div className="mt-6 lg:mt-4 flex items-center gap-x-2">
          <span className="mr-3">Available Colors:</span>
          <ProductColorSwatches
            colors={colors}
            variants={product.variants}
            setDisplayedVariant={setDisplayedVariant}
          />
        </div>

        <p className="mt-6 lg:mt-4 lg:mt-6 text-sm">{description}</p>

        {stock > 0 ? (
          <>
            <p className="text-center text-sm mb-1 mt-8 lg:mt-auto">
              In stock. Ready to ship
            </p>

            <ButtonAddToCart
              className="w-full"
              variantId={displayedVariant.variant_id}
              productId={product_id}
            />
          </>
        ) : (
          <p className="text-center font-medium text-red-600 mb-1 mt-6 lg:mt-auto">
            SOLD OUT
          </p>
        )}
      </article>
    </section>
  );
}
