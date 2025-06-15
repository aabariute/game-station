import CreateAdminForm from "@/components/admin/CreateAdminForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default async function Page() {
  return (
    <section className="max-w-[62rem] mx-auto">
      <div className="grid grid-cols-[100px_auto] md:grid-cols-[100px_auto_100px] mb-12 items-center">
        <Link href="/admin/users" className="button-primary flex-between gap-1">
          <FiArrowLeft className="text-[18px]" />
          <span>Users</span>
        </Link>
        <h2 className="md:col-2 text-2xl font-bold uppercase text-right md:text-center">
          Create admin user
        </h2>
      </div>

      <CreateAdminForm />
    </section>
  );
}
