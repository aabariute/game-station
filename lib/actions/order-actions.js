"use server";

import { supabase } from "@/db/supabase";
import { notFound } from "next/navigation";
import { PAGE_SIZE } from "../constants";
import { countAccruedDiscount, countCartPrice } from "../utils";
import { getSession } from "./auth-actions";
import { clearCart, getUserCart } from "./cart-actions";
import { getUserByEmail } from "./user-actions";

export async function getAllOrders(page = "1", page_size = PAGE_SIZE, sort) {
  const from = (+page - 1) * page_size;
  const to = from + page_size - 1;

  const query = supabase
    .schema("public")
    .from("orders")
    .select("*, order_items(*)", { count: "exact" });

  if (!sort || sort === "date-desc") {
    query.order("created_at", { ascending: false });
  } else if (sort === "date-asc") {
    query.order("created_at", { ascending: true });
  } else if (sort === "delivery-desc") {
    query
      .order("delivered_at", { ascending: false })
      .order("created_at", { ascending: false });
  } else if (sort === "delivery-asc") {
    query
      .order("delivered_at", { ascending: true })
      .order("created_at", { ascending: true });
  }

  const { data: orders, error, count } = await query.range(from, to);
  if (error) throw new Error("Orders not found");

  return {
    orders,
    total: count,
    totalPages: count ? Math.ceil(count / page_size) : 1,
  };
}

export async function getUserOrders(userId) {
  const { data: orders, error } = await supabase
    .schema("public")
    .from("orders")
    .select("*, order_items(image, quantity)")
    .order("created_at", { ascending: false })
    .eq("user_id", userId);

  if (error) throw new Error("User orders not found");

  return orders;
}

export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .schema("public")
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_id", orderId)
    .single();

  if (error) notFound();

  return data;
}

export async function getOrderSummary() {
  const { count: ordersCount } = await supabase
    .schema("public")
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: productsCount } = await supabase
    .schema("public")
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: usersCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { data: totalSales } = await supabase
    .schema("public")
    .rpc("get_total_sales");

  const { data: monthlySales } = await supabase
    .schema("public")
    .rpc("get_monthly_sales");

  const { data: latestOrders } = await supabase
    .schema("public")
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    monthlySales,
    latestOrders,
  };
}

export async function createOrder() {
  try {
    const session = await getSession();
    const cart = await getUserCart();

    if (!cart || !cart.cart_items?.length)
      throw new Error("Cart is empty or unavailable");

    const user = await getUserByEmail(session.user.email);

    if (!user) throw new Error("User not found");

    const { email, phone_number, address } = user;
    const {
      subtotalPrice,
      defaultDiscount,
      additionalDiscount,
      totalPrice,
      shippingPrice,
    } = countCartPrice(cart);

    // Create order object
    const newOrder = {
      user_id: session.user.id,
      user_contacts: { email, phone_number },
      shipping_address: address,
      shipping_method: cart.shipping_method,
      subtotal_price: subtotalPrice,
      discount_amount: defaultDiscount + additionalDiscount,
      shipping_price: shippingPrice,
      total_price: totalPrice + shippingPrice,
    };

    const { data, error } = await supabase
      .schema("public")
      .from("orders")
      .insert([newOrder])
      .select()
      .single();

    if (error) throw new Error("Failed to create an order");

    const orderItems = cart.cart_items.map((item) => {
      const totalDiscount = countAccruedDiscount(
        item.discount,
        item.additional_discount
      );
      const discountAmount = +((item.price * totalDiscount) / 100).toFixed(2);

      return {
        order_id: data.order_id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        brand: item.brand,
        title: item.title,
        color: item.color,
        image: item.image,
        quantity: item.quantity,
        initial_price: item.price,
        discount_applied: discountAmount,
        total_price: Math.max(0, item.price - discountAmount),
      };
    });

    const { error: itemsError } = await supabase
      .schema("public")
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      // Delete newly created order
      await supabase
        .schema("public")
        .from("orders")
        .delete()
        .eq("order_id", data.order_id);
      throw new Error("Failed to create order items");
    }

    await clearCart();

    return {
      success: true,
      id: data.order_id,
      message: "Order created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateOrderToDelivered(orderId) {
  try {
    const order = await getOrderById(orderId);
    if (!order) throw new Error("Order not found");

    const { error } = await supabase
      .schema("public")
      .from("orders")
      .update({
        is_delivered: true,
        delivered_at: new Date(),
      })
      .eq("order_id", orderId);

    if (error) throw new Error("Failed to mark order as delivered");

    return {
      success: true,
      message: "Order has been marked as delivered",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
