import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import NotificationBar from "@/components/NotificationBar";
import { signOutUser } from "@/lib/actions/auth-actions";
import Link from "next/link";

export default async function Layout({ children }) {
  const session = await auth();

  if (session?.user?.role === "admin") {
    return (
      <>
        <NotificationBar />
        <Header />
        <main className="flex w-full flex-1 flex-col">{children}</main>
        <Footer />

        <div className="relative z-50">
          <div className="flex-center fixed inset-0 z-40 bg-black/40">
            <div className="max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-800">
              <h3 className="text-xl font-semibold">Admin Login Detected</h3>

              <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                You're currently logged in as admin. Go back to admin area or
                sign out before logging in as customer.
              </p>
              <div className="flex-between mt-16">
                <form action={signOutUser}>
                  <button type="submit" className="button-secondary">
                    Sign Out
                  </button>
                </form>

                <Link href="/admin/overview" className="button-primary">
                  Admin area
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NotificationBar />
      <Header />
      <main className="flex w-full flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
