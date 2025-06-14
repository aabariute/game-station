"use client";

import { signInWithCredentials } from "@/lib/actions/auth-actions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function CredentialsSignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function SignInButton() {
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        disabled={pending}
        className="button-primary mt-6 w-full"
      >
        {pending ? "Signing In..." : "Sign In"}
      </button>
    );
  }

  return (
    <form action={action} className="w-full">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="w-full mb-4">
        <label htmlFor="email" className="block ml-1 mb-1 font-semibold">
          Email{" "}
          <span className="text-red-600" title="Required input">
            *
          </span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input focus:border-2 focus:border-indigo-400"
        />
      </div>

      <div className="w-full">
        <label htmlFor="password" className="block ml-1 mb-1 font-semibold">
          Password{" "}
          <span className="text-red-600" title="Required input">
            *
          </span>
        </label>

        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            required
            className="input focus:border-2 focus:border-indigo-400"
          />
        </div>
      </div>

      {data && !data.success && (
        <div className="mt-4 text-center text-red-600">{data.message}</div>
      )}

      <SignInButton />
    </form>
  );
}
