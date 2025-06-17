import { auth } from "@/auth";
import UserNavbar from "@/components/user/UserNavbar";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role === "admin") {
    redirect("/");
  }

  return (
    <div>
      <UserNavbar />

      <section className="mx-auto w-full max-w-4xl px-4 pt-10 pb-16">
        {children}
      </section>
    </div>
  );
}
