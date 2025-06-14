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
    <div className="p-3 md:p-4 lg:p-5 dark:bg-neutral-800 dark:text-neutral-300 relative w-full flex flex-col rounded-xl border border-neutral-200 hover:border-neutral-300 dark:border-pink-400/30 dark:hover:border-pink-500/50 shadow-sm hover:shadow-md">
      <div className="flex flex-col">
        <div>
          {discount > 0 && (
            <span className="absolute z-4 top-4 left-4 text-[13px] text-center w-[45px] h-[45px] leading-[45px] bg-pink-700 text-white rounded-full">
              -{discount}%
            </span>
          )}
          {productColors.length > 1 && (
            <div className="absolute z-4 top-4 right-4 flex flex-col gap-1">
              <ProductColorSwatches
                colors={productColors}
                variants={product.variants}
                setDisplayedVariant={setDisplayedVariant}
              />
            </div>
          )}
        </div>

        <div className="relative aspect-[4/3] mb-2">
          <Link href={`/products/${product_id}`}>
            <Image
              src={images[0]}
              alt={`Product ${title}`}
              fill
              className="object-contain hover:scale-105 transition duration-300"
            />
          </Link>
        </div>

        <p className="text-center tracking-wide uppercase font-semibold mb-0">
          {brand}
        </p>

        <Link
          href={`/products/${product_id}`}
          className="hover-fade-text pb-4 text-center text-sm font-light"
        >
          {title}
        </Link>
      </div>

      <div className="mt-auto flex-between">
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
