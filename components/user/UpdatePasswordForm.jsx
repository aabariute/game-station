"use client";

import { updateUserPassword } from "@/lib/actions/auth-actions";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [state, action, isPending] = useActionState(updateUserPassword, {
    success: false,
    message: "",
  });

  async function onFormSubmit(data) {
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(() => {
      action(formData);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      reset();
    }
  }, [state]);

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="card-lg flex flex-col gap-y-4 md:gap-y-2"
    >
      {state && !state.success && (
        <div className="text-red-600 text-sm mb-2">{state.message}</div>
      )}
      <div className="grid md:grid-cols-[11rem_1fr_1.2fr] gap-y-1 md:gap-y-2 gap-x-5 items-center">
        <span>New Password</span>
        <input
          className="input"
          type="password"
          {...register("password", { required: true, minLength: 3 })}
        />
        {errors.password && (
          <span className="text-red-600 text-xs">
            Password must be at least 3 characters
          </span>
        )}
      </div>
      <div className="grid md:grid-cols-[11rem_1fr_1.2fr] gap-y-1 md:gap-y-2 gap-x-5 items-center">
        <span>Confirm Password</span>

        <input
          className="input"
          type="password"
          {...register("confirmPassword", { required: true, minLength: 3 })}
        />
        {errors.confirmPassword && (
          <span className="text-red-600 text-xs">
            Password must be at least 3 characters
          </span>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="button-secondary w-32"
          type="button"
          onClick={() => reset()}
        >
          Cancel
        </button>
        <button className="button-primary w-32" type="submit">
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
