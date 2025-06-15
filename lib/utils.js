import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(...inputs));
};

export const truncate = (str, n) => {
  return str.length > n ? str.slice(0, n - 1).trim() + "..." : str;
};

export const productUnion = (arr1, arr2) => {
  const productMap = new Map();

  const mergeVariants = (existing, newVar) => {
    const variantMap = new Map(existing.map((v) => [v.product_id, v]));

    for (const v of newVar) {
      if (!variantMap.has(v.product_id)) {
        variantMap.set(v.product_id, v);
      }
    }

    return Array.from(variantMap.values());
  };

  const addToMap = (arr) => {
    for (const product of arr) {
      if (productMap.has(product.product_id)) {
        const existing = productMap.get(product.product_id);
        existing.variants = mergeVariants(existing.variants, product.variants);
      } else {
        // Clone to prevent mutation
        productMap.set(product.product_id, {
          ...product,
          variants: [...product.variants],
        });
      }
    }
  };

  addToMap(arr1);
  addToMap(arr2);

  return Array.from(productMap.values());
};

export const renameFiles = (
  images,
  startIndex = 0,
  variantIndex,
  productId
) => {
  const renamed = images.map((file, i) => {
    const extention = file.name.split(".").at(-1);

    const newName = `${productId}_v${variantIndex + 1}-${
      startIndex + i + 1
    }.${extention}`;

    return new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    });
  });

  return renamed;
};

export const renameImagePaths = (
  images,
  startIndex = 0,
  variantIndex,
  productId
) => {
  const renamed = images.map((img, i) => {
    const extention = img.name.split(".").at(-1);

    return `https://qzjoaseklvxaztlbgrmt.supabase.co/storage/v1/object/public/product-images//${productId}_v${
      variantIndex + 1
    }-${startIndex + i + 1}.${extention}`;
  });

  return renamed;
};

export const dateFormatter = (isoString) => {
  return isoString.split("T")[0];
};

export const priceFormatter = (price) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const calcPriceAfterDiscount = (price, discount = null) => {
  return discount ? price * ((100 - discount) / 100) : price;
};

export const countAccruedDiscount = (discount, additional_discount) => {
  const accrued =
    !additional_discount && !discount
      ? null
      : !additional_discount && discount
        ? discount
        : additional_discount && !discount
          ? additional_discount
          : 100 - (100 - discount) * 0.85;

  return accrued;
};

export const countCartPrice = (cart) => {
  if (!cart)
    return {
      subtotalPrice: 0,
      defaultDiscount: 0,
      additionalDiscount: 0,
      totalPrice: 0,
      shippingPrice: 4.99,
    };

  const subtotalPrice = +cart.cart_items
    .reduce((acc, cur) => cur.quantity * cur.price + acc, 0)
    .toFixed(2);
  const defaultDiscount = +cart.cart_items
    .reduce(
      (acc, cur) => (cur.quantity * cur.price * cur.discount) / 100 + acc,
      0
    )
    .toFixed(2);
  const additionalDiscount = +cart.cart_items
    .reduce(
      (acc, cur) =>
        (((cur.quantity * cur.price * (100 - cur.discount)) / 100) *
          cur.additional_discount) /
          100 +
        acc,
      0
    )
    .toFixed(2);
  const totalPrice = +(
    subtotalPrice -
    defaultDiscount -
    additionalDiscount
  ).toFixed(2);
  const shippingPrice =
    cart.shipping_method === "express" ? 7.99 : totalPrice < 50 ? 4.99 : 0;

  return {
    subtotalPrice,
    defaultDiscount,
    additionalDiscount,
    totalPrice,
    shippingPrice,
  };
};
