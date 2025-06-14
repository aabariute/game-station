"use client";

import { removeItemFromCart } from "@/lib/actions/cart-actions";
import { countCartPrice } from "@/lib/utils";
import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import { useOptimistic, useState, useTransition } from "react";
import { FaShippingFast } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { PiBagLight } from "react-icons/pi";
import CartSummary from "./CartSummary";
import ProductCard from "./ProductCard";

export default function CartModal({ cart }) {
  let [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticCart, optimisticDelete] = useOptimistic(
    cart,
    (curCart, cart_id) => ({
      ...curCart,
      cart_items: curCart.cart_items.filter((item) => item.id !== cart_id),
    })
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
          <div className="absolute flex-center w-[18px] h-[18px] right-[-4px] bottom-[-5px] rounded-full bg-pink-700 text-white text-[9px]">
            <span>{cartLength}</span>
          </div>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 w-screen flex-center bg-black/40">
          <DialogPanel className="p-6 bottom-0 top-0 right-0 fixed h-full w-full flex flex-col bg-white dark:bg-black border-l border-neutral-400 dark:border-neutral-800 md:w-[530px] transition duration-1000 data-[closed]:-translate-x-full">
            <div className="flex-between mb-4">
              <h3 className="text-2xl font-semibold">My Cart</h3>
              <IoClose
                onClick={() => setIsOpen(false)}
                className="text-3xl cursor-pointer hover:text-pink-500"
              />
            </div>

            <div className="flex-center py-2 border-y-2 border-neutral-600">
              {totalPrice < 50 ? (
                "Free shipping on orders over $50"
              ) : (
                <>
                  <FaShippingFast className="text-xl mr-2 text-green-600" />
                  Your order qualifies for free shipping
                </>
              )}
            </div>

            {(!optimisticCart || optimisticCart?.cart_items?.length === 0) && (
              <div className="flex flex-col items-center my-10 mx-auto text-center">
                <span className="bg-indigo-200 dark:bg-indigo-700 rounded-full p-4 mb-2 inline-block">
                  <PiBagLight className="w-8 h-8" />
                </span>
                <p className="mb-4 text-lg font-semibold">
                  Your cart is empty.
                </p>
                <p className="text-sm">Begin shopping now.</p>
              </div>
            )}

            {optimisticCart && optimisticCart?.cart_items.length > 0 && (
              <>
                <ul className="pt-8 pb-10 px-2 flex flex-col overflow-y-auto divide-y divide-neutral-200 dark:divide-neutral-700">
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

                <Link href="/checkout/information" className="">
                  <button className="button-primary w-full">Checkout</button>
                </Link>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
