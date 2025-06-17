import CreateAdminForm from "@/components/admin/CreateAdminForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default async function Page() {
  return (
    <section className="mx-auto max-w-[62rem]">
      <div className="mb-12 grid grid-cols-[100px_auto] items-center md:grid-cols-[100px_auto_100px]">
        <Link href="/admin/users" className="button-primary flex-between gap-1">
          <FiArrowLeft className="text-[18px]" />
          <span>Users</span>
        </Link>
        <h2 className="text-right text-2xl font-bold uppercase md:col-2 md:text-center">
          Create admin user
        </h2>
      </div>

      <CreateAdminForm />
    </section>
  );
}
