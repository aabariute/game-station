"use server";

import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth-actions";
import { getProductById } from "./product-actions";

export async function getReviews(productId) {
  const { data: reviews, error: reviewsError } = await supabase
    .schema("public")
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: true });

  if (reviewsError) return null;

  // Get all unique user ids without null/undefined values
  const userIds = [...new Set(reviews.map((r) => r.user_id).filter(Boolean))];

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, name")
    .in("id", userIds);

  if (usersError) return null;

  const reviewsWithUser = reviews.map((review) => {
    const user = users.find((user) => user.id === review.user_id);

    return { ...review, name: user?.name || "Deleted user" };
  });

  return reviewsWithUser;
}

export async function getUserReview(productId) {
  const session = await getSession();

  const { data: review } = await supabase
    .schema("public")
    .from("reviews")
    .select("title, description, rating")
    .eq("user_id", session.user.id)
    .eq("product_id", productId)
    .single();

  if (!review)
    return {
      title: "",
      description: "",
      rating: "",
    };

  return review;
}

export async function createReview(formData) {
  try {
    const session = await getSession();
    const userId = session.user.id;

    const { title, description, rating, product_id } = formData;

    const product = await getProductById(product_id);
    if (!product) throw new Error("Product not found");

    const { data: review } = await supabase
      .schema("public")
      .from("reviews")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", product_id)
      .single();

    if (review) {
      // Update review
      const { error } = await supabase
        .schema("public")
        .from("reviews")
        .update({ title, description, rating })
        .eq("id", review.id);

      if (error) throw new Error("Failed to update product review");

      revalidatePath(`/products/${product_id}`);

      return {
        success: true,
        message: "Review successfully updated",
      };
    } else {
      // Check if user has purchased the product that is being reviewed
      let hasPurchased;

      const { data: orders, error: ordersError } = await supabase
        .schema("public")
        .from("orders")
        .select("order_id, order_items(product_id)")
        .eq("user_id", userId);

      if (orders.length === 0 || ordersError) {
        hasPurchased = false;
      } else {
        hasPurchased = orders.some((order) =>
          order.order_items.some((item) => item.product_id === product_id)
        );
      }

      const { error: reviewError } = await supabase
        .schema("public")
        .from("reviews")
        .insert([
          {
            user_id: userId,
            product_id,
            title,
            rating,
            description,
            is_verified_purchase: hasPurchased,
          },
        ]);

      if (reviewError) throw new Error("Failed to add a review");

      revalidatePath(`/products/${product_id}`);

      return {
        success: true,
        message: "Review successfully created",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
