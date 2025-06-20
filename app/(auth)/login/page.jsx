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
    <main className="flex-center mx-4 flex-1 flex-col">
      <section className="bg-primary-200 w-full max-w-xl rounded-xl px-6 py-10 sm:px-14">
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

        <div className="flex-center mt-8 mb-3 w-full">
          <span className="after:bg-primary-300 relative w-full after:absolute after:top-[50%] after:left-0 after:block after:h-[1px] after:w-full after:content-['']"></span>
          <span className="px-3 text-nowrap">Or continue with email</span>
          <span className="after:bg-primary-300 relative w-full after:absolute after:top-[50%] after:left-0 after:block after:h-[1px] after:w-full after:content-['']"></span>
        </div>

        <CredentialsSignInForm />
      </section>
    </main>
  );
}
