import { auth } from "@/auth";
import ButtonFacebook from "@/components/auth/ButtonFacebook";
import ButtonGoogle from "@/components/auth/ButtonGoogle";
import CredentialsSignInForm from "@/components/auth/CredentialsSignInForm";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
};

export default async function Page({ searchParams }) {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    if (session.user.role === "admin") return redirect("/admin/overview");

    return redirect(callbackUrl || "/");
  }

  return (
    <main className="flex-1 flex-center flex-col mx-4">
      <section className="w-full max-w-xl py-10 px-6 sm:px-14 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
        <h2 className="mb-4 text-center text-3xl font-bold uppercase">
          Welcome back
        </h2>
        <div className="mb-10 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="button-tertiary ml-1 inline">
            Sign up.
          </Link>
        </div>

        <ButtonGoogle />
        <ButtonFacebook />

        <div className="mt-8 mb-3 w-full flex-center">
          <span className="relative w-full after:absolute after:content-[''] after:left-0 after:top-[50%] after:h-[1px] after:bg-neutral-300 after:w-full after:block"></span>
          <span className="text-nowrap px-3">Or continue with email</span>
          <span className="relative w-full after:absolute after:content-[''] after:left-0 after:top-[50%] after:h-[1px] after:bg-neutral-300 after:w-full after:block"></span>
        </div>

        <CredentialsSignInForm />
      </section>
    </main>
  );
}
