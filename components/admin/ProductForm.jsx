"use client";

import { createProduct, updateProduct } from "@/lib/actions/product-actions";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LabeledInput from "../ui/input/LabeledInput";
import VariantForm from "./VariantForm";

export default function ProductForm({ type, product, productId }) {
  const router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:
      product && type === "Update"
        ? product
        : {
            title: "",
            description: "",
            brand: "",
            category: "",
            variants: [
              {
                color: "",
                images: [],
                stock: 1000,
                price: null,
                discount: null,
              },
            ],
          },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  async function onFormSubmit(data) {
    if (type === "Create") {
      const res = await createProduct(data);

      if (!res.success) toast.error(res.message);

      toast.success(res.message);

      router.push("/admin/products");
    }

    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }

      const res = await updateProduct(data);

      if (!res.success) toast.error(res.message);

      toast.success(res.message);

      router.push("/admin/products");
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h3 className="mb-6 font-bold text-xl uppercase text-center">Product</h3>

      <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <LabeledInput
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            label="Title"
            htmlFor="title"
            error={errors.title}
          />
          {errors.title && (
            <span className="text-red-600 text-xs">{errors.title.message}</span>
          )}
        </div>
        <div>
          <LabeledInput
            {...register("brand", {
              required: "Brand is required",
              minLength: {
                value: 3,
                message: "Brand must be at least 3 characters",
              },
            })}
            label="Brand"
            htmlFor="brand"
            error={errors.brand}
          />
          {errors.brand && (
            <span className="text-red-600 text-xs">{errors.brand.message}</span>
          )}
        </div>
        <div>
          <LabeledInput
            {...register("category", {
              required: "Category is required",
              minLength: {
                value: 3,
                message: "Category must be at least 3 characters",
              },
            })}
            label="Category"
            htmlFor="category"
            error={errors.category}
          />
          {errors.category && (
            <span className="text-red-600 text-xs">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="lg:col-span-full">
          <label htmlFor="description" className="ml-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 100,
                message: "Description must be at least 100 characters",
              },
              maxLength: {
                value: 300,
                message: "Description cannot exceed 300 characters",
              },
            })}
            className={`textarea mt-1 ${errors.description ? "border-2 border-red-500 focus:border-red-500" : ""}`}
          />
          {errors.description && (
            <span className="text-red-600 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>

      <hr className="border-neutral-300 dark:border-neutral-700 mt-4 mb-10" />

      <h3 className="mb-6 font-bold text-xl uppercase text-center">Variants</h3>

      <VariantForm
        watch={watch}
        register={register}
        fields={fields}
        control={control}
        remove={remove}
        append={append}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex justify-end gap-5">
        <button
          className="button-secondary"
          type="button"
          onClick={() =>
            append({
              color: "",
              images: [],
              stock: 1000,
              price: null,
              discount: null,
            })
          }
        >
          + Add Variant
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-primary"
        >
          {isSubmitting ? "Submitting..." : `${type} product`}
        </button>
      </div>
    </form>
  );
}
