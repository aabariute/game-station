"use client";

import { createProduct, updateProduct } from "@/lib/actions/product-actions";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
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

      if (res.success) {
        router.push("/admin/products");
      }
    }

    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }

      const res = await updateProduct(data);

      if (res.success) {
        router.push("/admin/products");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h3 className="mb-6 font-bold text-xl uppercase text-center">Product</h3>

      <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <LabeledInput
            {...register("title", {
              required: true,
              minLength: 3,
            })}
            label="Title"
            htmlFor="title"
            error={errors.title}
          />
          {errors.title && (
            <span className="text-red-600 text-xs">
              Title should be at least 3 characters
            </span>
          )}
        </div>
        <div>
          <LabeledInput
            {...register("brand", {
              required: true,
              minLength: 3,
            })}
            label="Brand"
            htmlFor="brand"
            error={errors.brand}
          />
          {errors.brand && (
            <span className="text-red-600 text-xs">
              Brand should be at least 3 characters
            </span>
          )}
        </div>
        <div>
          <LabeledInput
            {...register("category", {
              required: true,
              minLength: 3,
            })}
            label="Category"
            htmlFor="category"
            error={errors.category}
          />
          {errors.category && (
            <span className="text-red-600 text-xs">
              Category should be at least 3 characters
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
              required: true,
              minLength: 3,
            })}
            className="textarea mt-1"
          />
          {errors.description && (
            <span className="text-red-600 text-xs">
              Description should be at least 3 characters
            </span>
          )}
        </div>
      </div>

      <hr className="border-neutral-800 mt-4 mb-10" />

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
