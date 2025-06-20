import { colors } from "@/lib/constants";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { IoChevronDownOutline, IoClose, IoCloseCircle } from "react-icons/io5";
import LabeledInput from "../ui/LabeledInput";

export default function VariantForm({
  watch,
  register,
  fields,
  control,
  remove,
  setValue,
  errors,
}) {
  return (
    <div className="divide-primary-200 flex flex-col gap-y-10 divide-y">
      {fields.map((field, index) => (
        <div key={field.id} className="pb-4">
          <div className="flex-between mb-4">
            <h4 className="bg-primary-300 rounded-md px-3 py-2 text-base font-medium tracking-wide">
              Variant #{index + 1}
            </h4>
            {index !== 0 && (
              <button
                className="button-danger"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            <Controller
              control={control}
              name={`variants.${index}.color`}
              defaultValue="black"
              render={({ field }) => {
                const currentColorValue = watch(`variants.${index}.color`);
                const selectedColorObj =
                  colors.find((c) => c.value === currentColorValue) ||
                  colors[0];

                return (
                  <Listbox
                    as="div"
                    value={selectedColorObj}
                    onChange={(color) => field.onChange(color.value)}
                    className="text-sm"
                  >
                    <ListboxButton className="flex-between border-primary-300 w-full cursor-pointer rounded-md border px-3 py-[calc(0.75rem+1px)] text-left shadow-sm">
                      {selectedColorObj.label}
                      <IoChevronDownOutline className="w-5" />
                    </ListboxButton>
                    <ListboxOptions
                      anchor="bottom start"
                      className="bg-primary-200 h-40 w-(--button-width) px-2 py-2"
                    >
                      {colors.map((color) => (
                        <ListboxOption
                          key={color.value}
                          value={color}
                          className="data-focus:bg-primary-300 flex cursor-pointer items-center gap-2 rounded-sm p-1"
                        >
                          <span
                            className="h-[20px] w-[20px] cursor-pointer rounded-full border-1 border-black transition duration-200 hover:scale-105"
                            style={{ backgroundColor: `${color.value}` }}
                          ></span>
                          <span className="text-sm">{color.label}</span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                );
              }}
            />

            <div>
              <LabeledInput
                {...register(`variants.${index}.stock`, {
                  required: true,
                  min: 1,
                })}
                type="number"
                label="Stock"
                htmlFor={`variants.${index}.stock`}
                error={errors.variants?.[index]?.stock}
              />
              {errors.variants?.[index]?.stock && (
                <span className="text-xs text-red-600">
                  Stock cannot be below 1
                </span>
              )}
            </div>
            <div>
              <LabeledInput
                {...register(`variants.${index}.price`, {
                  required: "Price is required",
                  pattern: {
                    value: /^(?!0\.00)\d{1,5}(\.\d{1,2})?$/,
                    message: "Enter a valid price (e.g. 10.99)",
                  },
                  validate: (value) => {
                    const num = parseFloat(value);
                    if (isNaN(num)) return "Price must be a number";
                    if (num < 0.99) return "Price must be at least 0.99";
                    return true;
                  },
                })}
                label="Price"
                htmlFor={`variants.${index}.price`}
                error={errors.variants?.[index]?.price}
              />
              {errors.variants?.[index]?.price && (
                <span className="text-xs text-red-600">
                  {errors.variants[index].price.message}
                </span>
              )}
            </div>
            <div>
              <LabeledInput
                {...register(`variants.${index}.discount`, {
                  required: false,
                  min: 1,
                  max: 99,
                })}
                type="number"
                label="Discount, % (Optional)"
                htmlFor={`variants.${index}.discount`}
                error={errors.variants?.[index]?.discount}
              />
              {errors.variants?.[index]?.discount && (
                <span className="text-xs text-red-600">
                  Discount range is between 1% and 99%
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 mb-3 flex items-center gap-4 px-[calc(0.75rem+1px)]">
            <Controller
              control={control}
              name={`variants.${index}.images`}
              defaultValue={[]}
              rules={{
                validate: (files) => {
                  if (files?.length === 0)
                    return "At least one image is required";
                  if (files?.length > 4) return "Max 4 images are allowed";
                  return true;
                },
              }}
              render={({ field }) => (
                <>
                  <label
                    htmlFor={`variants.${index}.images`}
                    className="button-tertiary"
                  >
                    Upload images
                  </label>
                  <input
                    type="file"
                    id={`variants.${index}.images`}
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const existingImgs = field.value || [];
                      const newFiles = Array.from(e.target.files).slice(0, 4);
                      field.onChange([...existingImgs, ...newFiles]);
                    }}
                    placeholder="Choose files"
                    className="hidden"
                  />
                </>
              )}
            />
            {errors?.variants?.[index]?.images && (
              <p className="text-sm text-red-500">
                {errors.variants[index].images.message}
              </p>
            )}
          </div>

          <div className="mb-3 px-[calc(0.75rem+1px)]">
            {watch(`variants.${index}.images`).map((img, imgIndex) => {
              return (
                img.name && (
                  <span key={imgIndex} className="flex items-center gap-2">
                    <IoClose
                      onClick={() => {
                        const currentImages =
                          watch(`variants.${index}.images`) || [];
                        const newImages = currentImages.filter(
                          (_, i) => i !== imgIndex,
                        );
                        setValue(`variants.${index}.images`, newImages);
                      }}
                      className="text-primary-500 hover:text-accent-magenta cursor-pointer text-[18px]"
                    />
                    {img.name}
                  </span>
                )
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {watch(`variants.${index}.images`).map(
              (img, imgIndex) =>
                !(img instanceof File) && (
                  <div
                    key={img}
                    className="border-primary-300 relative rounded-md border bg-white p-2 shadow-md"
                  >
                    <Image
                      src={img}
                      alt="Product image"
                      width={120}
                      height={120}
                    />

                    <button
                      type="button"
                      className="absolute top-[-6px] right-[-6px]"
                      onClick={() => {
                        const currentImages =
                          watch(`variants.${index}.images`) || [];
                        const newImages = currentImages.filter(
                          (_, i) => i !== imgIndex,
                        );
                        setValue(`variants.${index}.images`, newImages);
                      }}
                    >
                      <IoCloseCircle className="text-primary-500 hover:text-accent-magenta cursor-pointer text-[24px]" />
                    </button>
                  </div>
                ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
