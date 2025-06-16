import { auth } from "@/auth";
import UpdatePasswordForm from "@/components/user/UpdatePasswordForm";

export const metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await auth();

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold uppercase text-center tracking-wide">
        Profile
      </h2>

      <div className="max-w-4xl mx-auto">
        <article className="card-lg flex flex-col gap-6 mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-neutral-700 dark:text-neutral-400 font-bold">
              Name
            </span>
            <span className="text-sm">{session.user.name}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-neutral-700 dark:text-neutral-400 font-bold">
              Email
            </span>
            <span className="text-sm">{session.user.email}</span>
          </div>
        </article>

        <UpdatePasswordForm />
      </div>
    </section>
  );
}
