"use client";

import { removeItemFromCart } from "@/lib/actions/cart-actions";
import { countCartPrice } from "@/lib/utils";
import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import { startTransition, useOptimistic, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { PiBagLight } from "react-icons/pi";
import CartSummary from "./CartSummary";
import ProductCard from "./ProductCard";

export default function CartModal({ cart }) {
  let [isOpen, setIsOpen] = useState(false);
  const [optimisticCart, optimisticDelete] = useOptimistic(
    cart,
    (curCart, cart_id) => ({
      ...curCart,
      cart_items: curCart.cart_items.filter((item) => item.id !== cart_id),
    }),
  );

  const cartLength =
    optimisticCart &&
    optimisticCart.cart_items.reduce((acc, item) => item.quantity + acc, 0);
  const { subtotalPrice, defaultDiscount, totalPrice } =
    countCartPrice(optimisticCart);

  async function handleDeleteItemsFromCart(id) {
    startTransition(() => optimisticDelete(id));
    await removeItemFromCart(id);
  }

  return (
    <>
      <div className="relative">
        <PiBagLight
          className="hover-fade-text text-[28px]"
          onClick={() => setIsOpen(true)}
        />
        {cartLength > 0 && (
          <div className="flex-center bg-accent-magenta-foreground absolute right-[-4px] bottom-[-5px] h-[18px] w-[18px] rounded-full text-[9px] text-white">
            <span>{cartLength}</span>
          </div>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="flex-center fixed inset-0 w-screen bg-black/40">
          <DialogPanel
            as="div"
            transition
            className="md:border-primary-200 fixed top-0 right-0 bottom-0 flex h-full w-full flex-col bg-white p-6 duration-300 data-closed:translate-x-full md:w-[530px] md:border-l dark:bg-black"
          >
            <div className="flex-between mb-4">
              <h3 className="text-2xl font-semibold">My Cart</h3>
              <IoClose
                onClick={() => setIsOpen(false)}
                className="hover:text-accent-magenta cursor-pointer text-3xl"
              />
            </div>

            <div className="flex-center border-primary-300 border-y-2 py-2">
              {totalPrice < 50 ? (
                "Free shipping on orders over $50"
              ) : (
                <>
                  <FaShippingFast className="mr-2 text-xl text-green-600" />
                  Your order qualifies for free shipping
                </>
              )}
            </div>

            {(!optimisticCart || optimisticCart?.cart_items?.length === 0) && (
              <div className="mx-auto my-10 flex flex-col items-center text-center">
                <span className="dark:bg-accent-indigo mb-2 inline-block rounded-full bg-indigo-200 p-4">
                  <PiBagLight className="h-8 w-8" />
                </span>
                <p className="mb-4 text-lg font-semibold">
                  Your cart is empty.
                </p>
                <p className="text-sm">Begin shopping now.</p>
              </div>
            )}

            {optimisticCart && optimisticCart?.cart_items.length > 0 && (
              <>
                <ul className="divide-primary-200 flex flex-col divide-y overflow-y-auto px-2 pt-8 pb-10">
                  {optimisticCart.cart_items.map((item) => (
                    <ProductCard
                      key={`${item.product_id}%${item.variant_id}`}
                      item={item}
                      onDelete={() => handleDeleteItemsFromCart(item.id)}
                    />
                  ))}
                </ul>

                <CartSummary
                  subtotalPrice={subtotalPrice}
                  defaultDiscount={defaultDiscount}
                  totalPrice={totalPrice}
                />

                <Link
                  href="/checkout/information"
                  className="button-primary w-full"
                >
                  Checkout
                </Link>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
