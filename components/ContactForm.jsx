"use client";

import { EMAIL_REGEX_VALIDATION } from "@/lib/validators";
import { useForm } from "react-hook-form";

export default function ContactForm({ user }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  async function onFormSubmit(data) {
    await new Promise((res) => setTimeout(res, 2000));

    // Toast

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          {...register("name", { required: false })}
          className="input flex-1"
          placeholder="Name"
        />
        <div className="flex-1">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX_VALIDATION,
                message: "Enter a valid email address",
              },
            })}
            disabled={user?.email && true}
            placeholder="Email*"
            className={`input ${errors.email ? "border-2 border-red-500 focus:border-red-500" : ""}`}
          />
          {errors.email && (
            <span className="text-red-600 text-xs">{errors.email.message}</span>
          )}
        </div>
      </div>
      <input
        {...register("topic", { required: false })}
        className="input"
        placeholder="Topic"
      />
      <div>
        <textarea
          {...register("message", { required: "Message is required" })}
          className={`textarea ${errors.message ? "border-2 border-red-500 focus:border-red-500" : ""}`}
          placeholder="Your message*"
        />
        {errors.message && (
          <span className="text-red-600 text-xs">{errors.message.message}</span>
        )}
      </div>

      <button type="submit" className="button-primary mt-6 w-full">
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
