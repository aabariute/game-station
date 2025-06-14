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
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />

        <div className="relative z-50">
          <div className="fixed bg-black/40 inset-0 z-40 flex-center">
            <div className="max-w-lg rounded-lg bg-white dark:bg-neutral-800 shadow-lg p-8">
              <h3 className="font-semibold text-xl">Admin Login Detected</h3>

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
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer />
    </>
  );
}
