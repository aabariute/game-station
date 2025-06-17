"use client";

import { getSessionUser, updateUser } from "@/lib/actions/user-actions";
import { countries } from "@/lib/constants";
import {
  PHONE_REGEX_VALIDATION,
  ZIP_CODE_REGEX_VALIDATION,
} from "@/lib/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import LabeledInput from "../ui/LabeledInput";
import SpinnerMini from "../ui/SpinnerMini";

export default function CheckoutContactForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: async () => getSessionUser(),
  });

  async function onSubmit(data) {
    const { first_name, last_name, phone_number, address } = data;
    const name = `${first_name} ${last_name}`;

    const res = await updateUser({ name, phone_number, address });

    if (!res.success) return;

    router.push("/checkout/shipping");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-4"
    >
      <h3 className="text-xl font-semibold">Contact</h3>

      <input {...register("id")} type="hidden" />
      <input
        className="input"
        {...register("email")}
        placeholder="Email"
        disabled
      />

      <div className="flex gap-4">
        <div className="w-full">
          <LabeledInput
            htmlFor="first_name"
            error={errors.first_name}
            label="First name"
            {...register("first_name", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
          />
          {errors.first_name && (
            <span className="text-xs text-red-600">
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <LabeledInput
            htmlFor="last_name"
            error={errors.last_name}
            label="Last name"
            {...register("last_name", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
          />
          {errors.last_name && (
            <span className="text-xs text-red-600">
              {errors.last_name.message}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold">Delivery</h3>

      <select
        className={`select w-full ${errors.address?.country && "border-2 border-red-500 focus:border-red-500"}`}
        defaultValue=""
        {...register("address.country", { required: "Country is required" })}
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
      {errors.address?.country && (
        <span className="text-xs text-red-600">
          {errors.address?.country.message}
        </span>
      )}

      <div>
        <LabeledInput
          htmlFor="street_address"
          error={errors.address?.street_address}
          label="Apartment, suite, etc."
          {...register("address.street_address", {
            required: "Street address is required",
            minLength: {
              value: 5,
              message: "Street address must be at least 5 characters",
            },
          })}
        />
        {errors.address?.street_address && (
          <span className="text-xs text-red-600">
            {errors.address?.street_address.message}
          </span>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div className="relative flex flex-3 items-center">
          <div className="w-full">
            <LabeledInput
              htmlFor="city"
              error={errors.address?.city}
              label="City"
              {...register("address.city", {
                required: "City is required",
                minLength: {
                  value: 3,
                  message: "City must be at least 3 characters",
                },
              })}
            />
            {errors.address?.city && (
              <span className="text-xs text-red-600">
                {errors.address?.city.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full">
            <LabeledInput
              htmlFor="zip_code"
              error={errors.address?.zip_code}
              label="ZIP code"
              {...register("address.zip_code", {
                required: "ZIP code is required",
                pattern: {
                  value: ZIP_CODE_REGEX_VALIDATION,
                  message: "Enter a valid ZIP code",
                },
              })}
            />
            {errors.address?.zip_code && (
              <span className="text-xs text-red-600">Invalid zip code</span>
            )}
          </div>
        </div>
      </div>

      <div>
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

      <div className="mt-4 flex justify-between xl:mt-auto">
        <Link
          href="/products"
          className="button-secondary flex-center w-26 gap-1"
        >
          <FiArrowLeft className="text-[18px]" />
          <span>Back</span>
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-primary flex-center w-26 gap-1"
        >
          {isSubmitting ? (
            <SpinnerMini />
          ) : (
            <>
              <span>Next</span>
              <FiArrowRight className="text-[18px]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
