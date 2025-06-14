"use server";

import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";
import { getProductById } from "./product-actions";

// USERS
export async function getAllUsers(page = "1", page_size = PAGE_SIZE, role) {
  const from = (+page - 1) * page_size;
  const to = from + page_size - 1;

  const query = supabase.from("users").select("*", { count: "exact" });

  if (role) {
    query.in("role", role.split(","));
  }

  const {
    data: users,
    error,
    count,
  } = await query.order("created_at", { ascending: false }).range(from, to);

  if (error) throw new Error("Users could not be loaded");

  return {
    users,
    total: count,
    totalPages: count ? Math.ceil(count / page_size) : 1,
  };
}

export async function createAdminUser(formData) {
  try {
    await getSession();

    const { first_name, last_name, email, password } = formData;

    const { data: userExist } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userExist) throw new Error("User with this email already exist");

    const hashedPassword = await hash(password);

    const { error: createError } = await supabase.from("users").insert({
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
      role: "admin",
    });

    if (createError) throw new Error("Failed to create new admin user");

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Admin user created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteUser(userId) {
  try {
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) throw new Error("Failed to delete user");

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// ORDERS
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
    query.order("delivered_at", { ascending: false });
  } else if (sort === "delivery-asc") {
    query.order("delivered_at", { ascending: true });
  }

  const { data: orders, error, count } = await query.range(from, to);
  if (error) throw new Error("Orders not found");

  return {
    orders,
    total: count,
    totalPages: count ? Math.ceil(count / page_size) : 1,
  };
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

// PRODUCTS
export async function createVariants(
  variants,
  product_id,
  variantIndex = null
) {
  // (1) Upload images to storage
  const imagesMap = new Map();
  const imagePaths = new Map();

  for (let i = 0; i < variants.length; i++) {
    const newFileNames = renameFiles(
      variants[i].images,
      0,
      variantIndex || i,
      product_id
    );
    imagesMap.set(i, newFileNames);

    let newPathNames = [];

    for (let j = 0; j < variants.length; j++) {
      newPathNames.push(
        renameImagePaths(variants[j].images, j, variantIndex || i, product_id)
      );
    }
    imagePaths.set(i, newPathNames[i]);
  }

  const imagesArr = Array.from(imagesMap.values()).flat();

  imagesArr.forEach(async (image) => {
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(image.name, image);

    if (uploadError) throw new Error("Failed to upload image to database");
  });

  // (2) Insert variants of newly created product
  const { data: newVariants, error: variantsError } = await supabase
    .schema("public")
    .from("variants")
    .insert(
      variants.map((variant, index) => {
        const { color, stock, price, discount } = variant;

        return {
          product_id,
          images: imagePaths.get(index),
          color,
          stock,
          price,
          discount,
        };
      })
    )
    .select();

  if (variantsError) throw new Error("Failed to create variants");

  return newVariants;
}

export async function createProduct(formData) {
  try {
    const { title, description, brand, category, variants } = formData;

    const { data: product, error: productError } = await supabase
      .schema("public")
      .from("products")
      .insert([{ title, description, brand, category }])
      .select()
      .single();

    if (productError) throw new Error("Failed to create product");

    const newVariants = await createVariants(variants, product.product_id);

    if (!newVariants) {
      // Delete newly created product
      await supabase
        .schema("public")
        .from("products")
        .delete()
        .eq("product_id", product.product_id);
      throw new Error("Failed to create variants");
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Product and its variants created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateProduct(formData) {
  try {
    const { product_id, title, description, brand, category, variants } =
      formData;

    // (1) Check if product exists
    const existing = await getProductById(product_id);
    if (!existing) throw new Error("Product not found");

    // (2) Update product fields
    const { data: updated, error: updateError } = await supabase
      .schema("public")
      .from("products")
      .update({ title, description, brand, category })
      .eq("product_id", product_id)
      .select()
      .single();

    if (updateError) throw new Error("Failed to update product");

    // (3) Determine variant changes: update/delete existing variants, add newly created
    const existingIds = existing.variants.map((v) => v.variant_id);
    const newIds = variants.map((v) => v.variant_id);

    const variantsToDelete = existingIds.filter((id) => !newIds.includes(id));
    const variantsToUpdate = existingIds.filter((id) => newIds.includes(id));
    const variantsToCreate = variants.filter((v) => v.variant_id === undefined);

    // (3.1) Delete removed variants
    for (const id of variantsToDelete) {
      // Delete images from storage
      const images = existing.variants
        .filter((variant) => variant.variant_id === id)
        .flatMap((item) => item.images);
      await deleteImages(images);

      // Delete variant
      const { error: deleteError } = await supabase
        .schema("public")
        .from("variants")
        .delete()
        .eq("product_id", product_id)
        .eq("variant_id", id);

      if (deleteError) throw new Error("Failed to delete variant");
    }

    // (3.2) Get current variant index
    const currentVariantIndex = Math.max(
      ...existing.variants
        .flatMap((item) => item.images)
        .map(
          (img) => +img.split("/").pop().split("_")[1].split("-")[0].slice(1)
        ),
      0
    );

    // (3.3) Create new variants
    const newVariants = await createVariants(
      variantsToCreate,
      product_id,
      currentVariantIndex
    );

    if (!newVariants) throw new Error("Failed to create variants");

    // (3.4) Update existing variants
    for (const id of variantsToUpdate) {
      const updatedVariant = variants.find((v) => v.variant_id === id);
      const {
        color,
        images: formDataImages,
        stock,
        price,
        discount,
      } = updatedVariant;

      const { data: existingVariant, error: variantFetchError } = await supabase
        .schema("public")
        .from("variants")
        .select("images")
        .eq("product_id", product_id)
        .eq("variant_id", id)
        .single();

      if (variantFetchError)
        throw new Error("Failed to fetch variant for update");

      ///////////////////////////
      // Case 1: No image changes
      ///////////////////////////
      const onlyOldImgs = formDataImages.every((img) =>
        img.startsWith?.(process.env.SUPABASE_URL)
      );

      if (
        existingVariant.images.length === formDataImages.length &&
        onlyOldImgs
      ) {
        // No need to update images field
        const { error } = await supabase
          .schema("public")
          .from("variants")
          .update({ color, stock, price, discount })
          .eq("product_id", product_id)
          .eq("variant_id", id)
          .select();

        if (error) throw new Error("Failed to update variant");
        continue;
      }

      ////////////////////////////////////////////////
      // Case 2: some images are removed, no new added
      ////////////////////////////////////////////////
      if (
        existingVariant.images.length > formDataImages.length &&
        onlyOldImgs
      ) {
        // Check which images are being removed
        const imagesToRemove = existingVariant.images.filter(
          (img) => !formDataImages.includes(img)
        );
        const imageNames = imagesToRemove.map((img) => img.split("//").at(-1));

        // Remove images from storage
        const { error: removeError } = await supabase.storage
          .from("product-images")
          .remove(imageNames);

        if (removeError) throw new Error("Failed to remove old images");

        // Update variant
        const { error: updateError } = await supabase
          .schema("public")
          .from("variants")
          .update({ color, images: formDataImages, stock, price, discount })
          .eq("product_id", product_id)
          .eq("variant_id", id)
          .select();

        if (updateError) throw new Error("Failed to update variant");
        continue;
      }

      /////////////////////////////
      // Case 3: all images are new
      /////////////////////////////
      const onlyNewImgs = formDataImages.every(
        (img) => !img.startsWith?.(process.env.SUPABASE_URL)
      );
      const existingVersion = +existingVariant.images[0]
        .split("/")
        .pop()
        .split("_")[1]
        .split("-")[0]
        .slice(1);

      if (onlyNewImgs) {
        // Remove all existing variant images from storage
        const imageNames = existingVariant.images.map((img) =>
          img.split("//").at(-1)
        );

        const { error: removeError } = await supabase.storage
          .from("product-images")
          .remove(imageNames);

        if (removeError) throw new Error("Failed to remove old images");

        // Upload new images to storage
        const newImageNames = renameFiles(
          formDataImages,
          0,
          existingVersion - 1, // index of existing variant
          product_id
        );
        const newImagePaths = renameImagePaths(
          formDataImages,
          0,
          existingVersion - 1,
          product_id
        );

        newImageNames.forEach(async (image) => {
          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(image.name, image);

          if (uploadError)
            throw new Error("Failed to upload image to database");
        });

        // Update variant
        const { error: updateError } = await supabase
          .schema("public")
          .from("variants")
          .update({
            color,
            images: newImagePaths,
            stock,
            price,
            discount,
          })
          .eq("product_id", product_id)
          .eq("variant_id", id)
          .select();

        if (updateError) throw new Error("Failed to update variant");
        continue;
      }

      /////////////////////////////////////
      // Case 4: old and new images (mixed)
      /////////////////////////////////////
      const newImagesAfterSubmission = formDataImages.filter(
        (img) => !img.startsWith?.(process.env.SUPABASE_URL)
      );
      const existingImagesAfterSubmission = formDataImages.filter((img) =>
        img.startsWith?.(process.env.SUPABASE_URL)
      );

      if (
        newImagesAfterSubmission.length &&
        existingImagesAfterSubmission.length
      ) {
        // Remove existing images
        const imagesToRemove = existingVariant.images.filter(
          (img) => !existingImagesAfterSubmission.includes(img)
        );

        if (imagesToRemove.length > 0) {
          const imageNames = imagesToRemove.map((img) =>
            img.split("//").at(-1)
          );

          // Remove existing images from storage
          const { error: removeError } = await supabase.storage
            .from("product-images")
            .remove(imageNames);

          if (removeError) throw new Error("Failed to remove old images");
        }

        // Get the last image version of existing images
        const lastImageIndex = existingImagesAfterSubmission
          .at(-1)
          .split("//")
          .pop()
          .split("_")[1]
          .split(".")[0]
          .at(-1);

        const newImageNames = renameFiles(
          newImagesAfterSubmission,
          +lastImageIndex,
          existingVersion - 1,
          product_id
        );

        const newImagePaths = [
          ...existingImagesAfterSubmission,
          ...renameImagePaths(
            newImagesAfterSubmission,
            +lastImageIndex,
            existingVersion - 1,
            product_id
          ),
        ];

        newImageNames.forEach(async (image) => {
          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(image.name, image);

          if (uploadError)
            throw new Error("Failed to upload image to database");
        });

        // Update variant
        const { error } = await supabase
          .schema("public")
          .from("variants")
          .update({
            color,
            images: newImagePaths,
            stock,
            price,
            discount,
          })
          .eq("product_id", product_id)
          .eq("variant_id", id)
          .select();

        if (error) throw new Error("Failed to update variant");
        continue;
      }
    }

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteImages(images) {
  const imageNames = images.map((img) => img.split("//").at(-1));

  if (!imageNames || !imageNames.length) {
    throw new Error("No images to remove from storage");
  }

  const { error: removeError } = await supabase.storage
    .from("product-images")
    .remove(imageNames);

  if (removeError) throw new Error("Failed to remove variant images");

  return;
}

export async function deleteProduct(productId) {
  try {
    const { data, error } = await supabase
      .schema("public")
      .from("variants")
      .select("images")
      .eq("product_id", productId);

    if (error) throw new Error("Failed to get product variants");

    const images = data.flatMap((item) => item.images);

    // Delete images from storage
    await deleteImages(images);

    // Delete product and its variants
    const { error: deleteError } = await supabase
      .schema("public")
      .from("products")
      .delete()
      .eq("product_id", productId);

    if (deleteError) throw new Error("Failed to delete product");

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
