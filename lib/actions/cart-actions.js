"use server";

import { auth } from "@/auth";
import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getVariantById } from "./product-actions";
import { getSession } from "./auth-actions";

export async function getCartFromCookies(sessionCartId) {
  const { data: cart } = await supabase
    .schema("public")
    .from("carts")
    .select("*")
    .eq("session_cart_id", sessionCartId)
    .single();

  if (!cart) return undefined;

  return cart;
}

export async function getUserCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  const session = await auth();
  const userId = session?.user?.id ? session.user.id : undefined;

  if (userId) {
    const { data: cart } = await supabase
      .schema("public")
      .from("carts")
      .select("*, cart_items(*)")
      .eq("user_id", userId)
      .single();

    if (!cart) return undefined;

    return cart;
  } else {
    const { data: cart } = await supabase
      .schema("public")
      .from("carts")
      .select("*, cart_items(*)")
      .eq("session_cart_id", sessionCartId)
      .single();

    if (!cart) return undefined;

    return cart;
  }
}

export async function addItemToCart(productId, variantId) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    const session = await auth();
    const userId = session?.user?.id ? session.user.id : undefined;

    const variant = await getVariantById(variantId, productId);
    if (variant.stock < 1) throw new Error("Product is out of stock");

    const cart = await getUserCart();

    if (!cart) {
      // Create a new record on carts and cart_items tables
      const { data: cart, error: cartError } = await supabase
        .schema("public")
        .from("carts")
        .insert([{ user_id: userId, session_cart_id: sessionCartId }])
        .select()
        .single();

      if (!cart || cartError) throw new Error("Failed to create new cart");

      const { error: cartItemsError } = await supabase
        .schema("public")
        .from("cart_items")
        .insert([
          {
            cart_id: cart.id,
            product_id: productId,
            variant_id: variantId,
            quantity: 1,
            brand: variant.products.brand,
            title: variant.products.title,
            color: variant.color,
            image: variant.images[0],
            price: variant.price,
            discount: variant.discount,
          },
        ]);

      if (cartItemsError) {
        // Delete newly created cart
        await supabase
          .schema("public")
          .from("carts")
          .delete()
          .eq("id", cart.id);
        throw new Error("Failed to create new cart");
      }
    } else {
      const existItem = cart.cart_items.find(
        (item) => item.product_id === productId && item.variant_id === variantId
      );

      if (existItem) {
        const { error } = await supabase
          .schema("public")
          .rpc("increment_cart_quantity", {
            cid: existItem.id,
            pid: productId,
            vid: variantId,
          });

        if (error) throw new Error("Failed to update cart item quantity");
      } else {
        const { error } = await supabase
          .schema("public")
          .from("cart_items")
          .insert({
            cart_id: cart.id,
            product_id: productId,
            variant_id: variantId,
            quantity: 1,
            brand: variant.products.brand,
            title: variant.products.title,
            color: variant.color,
            image: variant.images[0],
            price: variant.price,
            discount: variant.discount,
          });

        if (error) throw new Error("Failed to add item to cart");
      }
    }
    revalidatePath("/products");

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function decreaseCartItemsQuantity(
  cartItemsId,
  productId,
  variantId
) {
  try {
    const { data, error } = await supabase
      .schema("public")
      .from("cart_items")
      .select("*")
      .eq("id", cartItemsId)
      .single();

    if (error) throw new Error("Product in cart not found");

    if (data.quantity === 1) {
      await removeItemFromCart(cartItemsId);
    } else {
      const { error } = await supabase
        .schema("public")
        .rpc("decrement_cart_quantity", {
          cid: cartItemsId,
          pid: productId,
          vid: variantId,
          decr: 1,
        });

      if (error) throw new Error("Failed to update quantity of items in cart");
    }

    revalidatePath("/products");

    return {
      success: true,
      message: "Item removed from cart",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function removeItemFromCart(cartItemsId) {
  try {
    const { error } = await supabase
      .schema("public")
      .from("cart_items")
      .delete()
      .eq("id", cartItemsId);

    if (error) throw new Error("Failed to delete item in cart");

    revalidatePath("/products");

    return {
      success: true,
      message: "Item removed from cart",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function clearCart() {
  const session = await getSession();

  const { error } = await supabase
    .schema("public")
    .from("carts")
    .delete()
    .eq("user_id", session.user.id);

  if (error) throw new Error("Failed to delete user cart");

  return;
}

export async function updateShippingMethod(formData) {
  const session = await getSession();

  const { error } = await supabase
    .schema("public")
    .from("carts")
    .update({ shipping_method: formData.get("shipping_method") })
    .eq("user_id", session.user.id);

  if (error) throw new Error("Failed to update shipping method");

  redirect("/checkout/payment");
}

export async function updateCartDiscount(cartId, discount) {
  try {
    const { error } = await supabase
      .schema("public")
      .from("cart_items")
      .update({ additional_discount: discount })
      .eq("cart_id", cartId);

    if (error) throw new Error("Failed to apply discount code");

    revalidatePath("/checkout");

    return {
      success: true,
      message: "Discount code successfully applied",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
