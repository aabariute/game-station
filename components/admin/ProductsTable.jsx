"use client";

import { capitalize, priceFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import ProductDeleteButton from "./ProductDeleteButton";

export default function ProductsTable({ products }) {
  const [expandedProductId, setExpandedProductId] = useState(null);

  function toggleExpand(e, productId) {
    e.stopPropagation();
    setExpandedProductId((id) => (id === productId ? null : productId));
  }

  return (
    <table className="w-full border-separate rounded-lg border border-gray-300 text-sm dark:border-gray-700 dark:bg-neutral-800">
      <thead>
        <tr>
          <th className="py-3 pl-4 text-left">ID</th>
          <th className="py-3 text-left">TITLE</th>
          <th className="py-3 text-left">BRAND</th>
          <th className="py-3 text-left">CATEGORY</th>
          <th className="py-3 text-center">ACTIONS</th>
          <th className="py-3 pr-4 text-center">EXPAND</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <React.Fragment key={product.product_id}>
            <tr onClick={(e) => toggleExpand(e, product.product_id)}>
              <td className="min-w-[180px] border-t border-gray-300 py-2 pr-3 pl-4 dark:border-gray-700">
                {product.product_id}
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {product.title}
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {product.brand}
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {product.category}
              </td>
              <td
                className="border-t border-gray-300 py-2 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center gap-x-2">
                  <Link
                    href={`/admin/products/${product.product_id}`}
                    className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <FaPen className="text-[16px]" />
                  </Link>
                  <ProductDeleteButton productId={product.product_id} />
                </div>
              </td>
              <td className="border-t border-gray-300 py-2 pr-4 text-center align-middle dark:border-gray-700">
                <button
                  className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  style={{
                    backgroundColor:
                      expandedProductId === product.product_id &&
                      "var(--color-neutral-400)",
                  }}
                  onClick={(e) => toggleExpand(e, product.product_id)}
                >
                  {expandedProductId === product.product_id ? (
                    <IoChevronUpOutline className="text-[16px]" />
                  ) : (
                    <IoChevronDownOutline className="text-[16px]" />
                  )}
                </button>
              </td>
            </tr>

            {expandedProductId === product.product_id && (
              <tr>
                <td
                  colSpan={6}
                  className="bg-gray-100 px-4 pt-2 dark:bg-neutral-700"
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-700 dark:text-gray-200">
                        <th className="py-2">Variant ID</th>
                        <th className="py-2">Color</th>
                        <th className="py-2">Image</th>
                        <th className="py-2">Stock</th>
                        <th className="py-2">Price</th>
                        <th className="py-2 text-center">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((variant) => (
                        <tr
                          key={variant.variant_id}
                          className="border-t border-gray-300 dark:border-gray-600"
                        >
                          <td className="max-w-[130px] min-w-[80px] py-2">
                            {variant.variant_id}
                          </td>
                          <td className="py-2">{capitalize(variant.color)}</td>
                          <td className="py-2">
                            <Image
                              src={variant.images[0]}
                              alt="Variant image"
                              width={45}
                              height={45}
                              className="aspect-square object-cover"
                            />
                          </td>
                          <td className="py-2">{variant.stock}</td>
                          <td className="py-2">
                            {priceFormatter(variant.price)}
                          </td>
                          <td className="py-2 text-center">
                            {variant.discount ? `${variant.discount}%` : `-`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
