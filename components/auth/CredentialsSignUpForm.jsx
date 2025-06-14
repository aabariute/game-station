"use client";

import { signUpWithCredentials } from "@/lib/actions/auth-actions";
import { EMAIL_REGEX_VALIDATION } from "@/lib/validators";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";

export default function CredentialsSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, action, isPending] = useActionState(signUpWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(() => {
      action(formData);
    });
  }

  function inputClasses(hasError) {
    return `input ${hasError ? "border-2 border-red-500 focus:border-red-500" : ""}`;
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div>
        <label htmlFor="firstName" className="block ml-1 mb-1 font-semibold">
          First name <span className="text-red-600">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          className={inputClasses(errors.firstName)}
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters",
            },
          })}
        />
        {errors.firstName && (
          <span className="text-red-600 text-xs mt-1">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="mt-3">
        <label htmlFor="lastName" className="block ml-1 mb-1 font-semibold">
          Last name <span className="text-red-600">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          className={inputClasses(errors.lastName)}
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters",
            },
          })}
        />
        {errors.lastName && (
          <span className="text-red-600 text-xs mt-1">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="mt-3">
        <label htmlFor="email" className="block ml-1 mb-1 font-semibold">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          className={inputClasses(errors.email)}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX_VALIDATION,
              message: "Email address is invalid",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-600 text-xs mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="mt-3">
        <label htmlFor="password" className="block ml-1 mb-1 font-semibold">
          Password <span className="text-red-600">*</span>
        </label>
        <input
          id="password"
          type="password"
          className={inputClasses(errors.password)}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-600 text-xs mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="mt-3">
        <label
          htmlFor="confirmPassword"
          className="block ml-1 mb-1 font-semibold"
        >
          Confirm Password <span className="text-red-600">*</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={inputClasses(errors.confirmPassword)}
          {...register("confirmPassword", {
            required: "Confirm password is required",
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-600 text-xs mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="button-primary mt-6 w-full"
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>

      {data && !data.success && (
        <div className="mt-2 mb-4 text-center text-red-600">{data.message}</div>
      )}

      <div className="text-sm text-center">
        Already have an account?
        <Link href="/login" className="button-tertiary ml-1 inline">
          Sign In
        </Link>
      </div>
    </form>
  );
}
