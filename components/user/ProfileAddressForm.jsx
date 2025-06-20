"use client";

import { updateUser } from "@/lib/actions/user-actions";
import { countries } from "@/lib/constants";
import {
  PHONE_REGEX_VALIDATION,
  ZIP_CODE_REGEX_VALIDATION,
} from "@/lib/validators";
import { DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import LabeledInput from "../ui/LabeledInput";
import Modal from "../ui/Modal";

export default function ProfileAddressForm({ address, phone_number }) {
  let [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phone_number: phone_number || "",
      country: address.country || "",
      city: address.city || "",
      street_address: address.street_address || "",
      zip_code: address.zip_code || "",
    },
  });

  async function onFormSubmit(data) {
    const address = {
      country: data.country,
      city: data.city,
      street_address: data.street_address,
      zip_code: data.zip_code,
    };

    const res = await updateUser({ address, phone_number: data.phone_number });

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);

    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover-fade-text cursor-pointer font-semibold"
      >
        {!address.city ? (
          "+ Add"
        ) : (
          <CiEdit className="mb-[-1.5px] text-[17px]" />
        )}
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex-between mb-8">
          <DialogTitle as="h3" className="text-xl font-semibold">
            Add Address
          </DialogTitle>
          <IoClose
            onClick={() => setIsOpen(false)}
            className="hover:text-accent-magenta cursor-pointer text-2xl"
          />
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="flex-1 flex-col">
            <select
              className={`select w-full ${errors.country && "border-2 border-red-500 focus:border-red-500"}`}
              defaultValue=""
              {...register("country", { required: "Country is required" })}
            >
              <option value="" disabled hidden>
                Select country
              </option>
              {countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-xs text-red-600">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <LabeledInput
              htmlFor="street_address"
              error={errors.street_address}
              label="Street address"
              {...register("street_address", {
                required: "Street address is required",
                minLength: {
                  value: 5,
                  message: "Street address must be at least 5 characters",
                },
              })}
            />
            {errors.street_address && (
              <span className="text-xs text-red-600">
                {errors.street_address.message}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <div className="relative flex-3 flex-col">
              <LabeledInput
                htmlFor="city"
                error={errors.city}
                label="City"
                {...register("city", {
                  required: "City is required",
                  minLength: {
                    value: 3,
                    message: "City must be at least 3 characters",
                  },
                })}
              />
              {errors.city && (
                <span className="text-xs text-red-600">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div className="flex-1 flex-col">
              <LabeledInput
                htmlFor="zip_code"
                error={errors.zip_code}
                label="ZIP code"
                {...register("zip_code", {
                  required: "ZIP code is required",
                  pattern: {
                    value: ZIP_CODE_REGEX_VALIDATION,
                    message: "Enter a valid ZIP code",
                  },
                })}
              />
              {errors.zip_code && (
                <span className="text-xs text-red-600">
                  {errors.zip_code.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <LabeledInput
              htmlFor="phone_number"
              error={errors.phone_number}
              label="Phone number"
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  value: PHONE_REGEX_VALIDATION,
                  message: "Enter a valid phone number",
                },
              })}
            />
            {errors.phone_number && (
              <span className="text-xs text-red-600">
                {errors.phone_number.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="button-primary self-end"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>
    </>
  );
}
