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
import LabeledInput from "../ui/input/LabeledInput";

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
    <div className="flex flex-col gap-y-10 divide-y divide-neutral-800">
      {fields.map((field, index) => (
        <div key={field.id} className="pb-4">
          <div className="flex-between mb-4">
            <h4 className="font-medium tracking-wide text-base py-2 px-3 rounded-md bg-neutral-700">
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

          <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    <ListboxButton className="flex-between text-left w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-[calc(0.75rem+1px)] px-3 cursor-pointer">
                      {selectedColorObj.label}
                      <IoChevronDownOutline className="w-5" />
                    </ListboxButton>
                    <ListboxOptions
                      anchor="bottom start"
                      className="w-(--button-width) h-40 bg-neutral-800 px-2 py-2"
                    >
                      {colors.map((color) => (
                        <ListboxOption
                          key={color.value}
                          value={color}
                          className="flex items-center gap-2 cursor-pointer p-1 data-focus:bg-neutral-700 rounded-sm"
                        >
                          <span
                            className="border-2 border-neutral-900 w-[20px] h-[20px] rounded-full cursor-pointer hover:scale-105 transition duration-200"
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
                <span className="text-red-600 text-xs">
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
                <span className="text-red-600 text-xs">
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
                <span className="text-red-600 text-xs">
                  Discount range is between 1% and 99%
                </span>
              )}
            </div>
          </div>

          <div className="px-[calc(0.75rem+1px)] mt-4 mb-3 flex items-center gap-4">
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
                    className="pb-[0.10rem] border-b border-b-indigo-700 text-indigo-700 font-medium cursor-pointer"
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
              <p className="text-red-500 text-sm">
                {errors.variants[index].images.message}
              </p>
            )}
          </div>

          <div className="px-[calc(0.75rem+1px)] mb-3">
            {watch(`variants.${index}.images`).map((img, imgIndex) => {
              return (
                img.name && (
                  <span
                    key={imgIndex}
                    className="block flex items-center gap-2"
                  >
                    <IoClose
                      onClick={() => {
                        const currentImages =
                          watch(`variants.${index}.images`) || [];
                        const newImages = currentImages.filter(
                          (_, i) => i !== imgIndex
                        );
                        setValue(`variants.${index}.images`, newImages);
                      }}
                      className="text-[18px] text-neutral-500 cursor-pointer hover:text-pink-500"
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
                    className="border border-neutral-300 bg-white shadow-md rounded-md relative p-2"
                  >
                    <Image
                      src={img}
                      alt="Product image"
                      width={120}
                      height={120}
                    />

                    <button
                      type="button"
                      className="absolute right-[-6px] top-[-6px]"
                      onClick={() => {
                        const currentImages =
                          watch(`variants.${index}.images`) || [];
                        const newImages = currentImages.filter(
                          (_, i) => i !== imgIndex
                        );
                        setValue(`variants.${index}.images`, newImages);
                      }}
                    >
                      <IoCloseCircle className="text-[24px] text-neutral-400 cursor-pointer hover:text-pink-500" />
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// const files = Array.from(e.target.files).slice(0, 4);
// field.onChange(files);
