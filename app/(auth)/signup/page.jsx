import { auth } from "@/auth";
import CredentialsSignUpForm from "@/components/auth/CredentialsSignUpForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up",
};

export default async function Page({ searchParams }) {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
    // return redirect("/");
  }

  return (
    <main className="flex-center mx-4 flex-1 flex-col">
      <section className="w-full max-w-xl rounded-xl bg-neutral-100 px-6 py-10 sm:px-14 dark:bg-neutral-800">
        <h2 className="mb-2 text-center text-3xl font-bold uppercase">
          Create Account
        </h2>
        <p className="mb-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Enter your information below to sign up
        </p>
        <CredentialsSignUpForm />
      </section>
    </main>
  );
}
