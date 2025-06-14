import FilterRoles from "@/components/admin/FilterRoles";
import Pagination from "@/components/Pagination";
import { getAllUsers } from "@/lib/actions/user-actions";
import { requireAdmin } from "@/lib/auth-guard";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { PAGE_SIZE } from "@/lib/constants";
import UserDeleteButton from "@/components/admin/UserDeleteButton";

export const metadata = {
  title: "Users",
};

const roles = [
  { value: "admin", label: "Admins" },
  { value: "user", label: "Users" },
];

export default async function Page({ searchParams }) {
  await requireAdmin();

  const { page = "1", role } = await searchParams;
  const { users, total, totalPages } = await getAllUsers(page, PAGE_SIZE, role);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold uppercase text-center tracking-wide">
        Users
      </h2>

      <div className="flex-between mb-4">
        <Link href="/admin/users/create" className="button-primary">
          + New Admin
        </Link>
        <FilterRoles roles={roles} />
      </div>

      <table className="w-full border border-gray-300 dark:border-gray-700 dark:bg-neutral-800 border-separate rounded-lg text-sm">
        <thead>
          <tr>
            <th className="py-3 pl-4 text-left">ID</th>
            <th className="py-3 text-left">NAME</th>
            <th className="py-3 text-left">EMAIL</th>
            <th className="py-3 text-left">ROLE</th>
            <th className="py-3 pr-4 text-center">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-t min-w-[180px] border-gray-300 dark:border-gray-700 py-2 pl-4 pr-3">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="hover:text-neutral-500"
                >
                  {user.id}
                </Link>
              </td>
              <td className="text-nowrap border-t border-gray-300 dark:border-gray-700 py-2 pr-3">
                {user.name}
              </td>
              <td className="text-nowrap border-t border-gray-300 dark:border-gray-700 py-2 pr-3">
                {user.email}
              </td>
              <td className="text-nowrap border-t border-gray-300 dark:border-gray-700 py-2 pr-3">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </td>
              <td className="border-t border-gray-300 dark:border-gray-700 py-2 pr-4">
                {user.role === "user" && (
                  <div className="flex items-center justify-center gap-x-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <FaEye className="text-[16px]" />
                    </Link>
                    <UserDeleteButton user_id={user.id} userName={user.name} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </section>
  );
}
