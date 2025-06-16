"use client";

import LabeledInput from "@/components/ui/input/LabeledInput";
import { createAdminUser } from "@/lib/actions/user-actions";
import { EMAIL_REGEX_VALIDATION } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateAdminForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const res = await createAdminUser(data);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);

    reset();

    router.push("/admin/users");
  }

  return (
    <form
      className="max-w-xl mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <LabeledInput
          label="First name"
          htmlFor="first_name"
          {...register("first_name", { required: true, minLength: 3 })}
          error={errors.first_name}
        />
        {errors.first_name && (
          <span className="text-red-600 text-xs">
            First name should be at least 3 characters
          </span>
        )}
      </div>
      <div>
        <LabeledInput
          label="Last name"
          htmlFor="last_name"
          {...register("last_name", { required: true, minLength: 3 })}
          error={errors.last_name}
        />
        {errors.last_name && (
          <span className="text-red-600 text-xs">
            Last name should be at least 3 characters
          </span>
        )}
      </div>
      <div>
        <LabeledInput
          label="Email"
          htmlFor="email"
          {...register("email", {
            required: true,
            pattern: EMAIL_REGEX_VALIDATION,
          })}
          error={errors.email}
        />
        {errors.email && (
          <span className="text-red-600 text-xs">Email address is invalid</span>
        )}
      </div>
      <div>
        <LabeledInput
          type="password"
          label="password"
          htmlFor="password"
          {...register("password", { required: true })}
          error={errors.password}
        />
        {errors.password && (
          <span className="text-red-600 text-xs">
            Password should be at least 3 characters
          </span>
        )}
      </div>

      <button className="button-primary mt-6" type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
