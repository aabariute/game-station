import { auth } from "@/auth";
import UpdatePasswordForm from "@/components/user/UpdatePasswordForm";

export const metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await auth();

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold tracking-wide uppercase">
        Profile
      </h2>

      <div className="mx-auto max-w-4xl">
        <article className="card-lg mb-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-primary-600 font-bold">Name</span>
            <span className="text-sm">{session.user.name}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-primary-600 font-bold">Email</span>
            <span className="text-sm">{session.user.email}</span>
          </div>
        </article>

        <UpdatePasswordForm />
      </div>
    </section>
  );
}
