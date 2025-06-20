"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ButtonAddToCart from "./ButtonAddToCart";
import ProductColorSwatches from "./ProductColorSwatches";
import ProductPrice from "./ProductPrice";

export default function ProductCard({ product }) {
  const { product_id, title, brand } = product;
  const productColors = product.variants.map((product) => product.color);

  const [displayedVariant, setDisplayedVariant] = useState(product.variants[0]);
  const { images, price, discount, stock } = displayedVariant;

  return (
    <div className="border-primary-200 hover:border-primary-300 dark:bg-primary-200 relative flex w-full flex-col rounded-xl border p-3 shadow-sm hover:shadow-md md:p-4 lg:p-5 dark:border-pink-400/30 dark:hover:border-pink-500/50">
      <div className="flex flex-col">
        <div>
          {discount > 0 && (
            <span className="bg-accent-magenta-foreground absolute top-4 left-4 z-4 h-[45px] w-[45px] rounded-full text-center text-[13px] leading-[45px] text-white">
              -{discount}%
            </span>
          )}
          {productColors.length > 1 && (
            <div className="absolute top-4 right-4 z-4 flex flex-col gap-1">
              <ProductColorSwatches
                colors={productColors}
                variants={product.variants}
                setDisplayedVariant={setDisplayedVariant}
              />
            </div>
          )}
        </div>

        <div className="relative mb-2 aspect-[4/3]">
          <Link href={`/products/${product_id}`}>
            <Image
              src={images[0]}
              alt={`Product ${title}`}
              fill
              className="object-contain transition duration-300 hover:scale-105"
            />
          </Link>
        </div>

        <p className="mb-0 text-center font-semibold tracking-wide uppercase">
          {brand}
        </p>

        <Link
          href={`/products/${product_id}`}
          className="hover-fade-text pb-4 text-center text-sm font-light"
        >
          {title}
        </Link>
      </div>

      <div className="flex-between mt-auto">
        <ProductPrice price={price} discount={discount} />

        {stock > 0 ? (
          <ButtonAddToCart
            productId={product_id}
            variantId={displayedVariant.variant_id}
            buttonText="+ Add"
            className="px-2 text-xs"
          />
        ) : (
          <span className="font-medium text-red-600">SOLD OUT</span>
        )}
      </div>
    </div>
  );
}
