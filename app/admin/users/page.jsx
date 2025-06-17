import FilterRoles from "@/components/admin/FilterRoles";
import UserDeleteButton from "@/components/admin/UserDeleteButton";
import Pagination from "@/components/Pagination";
import { getAllUsers } from "@/lib/actions/user-actions";
import { PAGE_SIZE } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export const metadata = {
  title: "Users",
};

const roles = [
  { value: "admin", label: "Admins" },
  { value: "user", label: "Users" },
];

export default async function Page({ searchParams }) {
  const { page = "1", role } = await searchParams;
  const { users, total, totalPages } = await getAllUsers(page, PAGE_SIZE, role);

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold tracking-wide uppercase">
        Users
      </h2>

      <div className="flex-between mb-4">
        <Link href="/admin/users/create" className="button-primary">
          + New Admin
        </Link>
        <FilterRoles roles={roles} />
      </div>

      <table className="w-full border-separate rounded-lg border border-gray-300 text-sm dark:border-gray-700 dark:bg-neutral-800">
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
              <td className="min-w-[180px] border-t border-gray-300 py-2 pr-3 pl-4 dark:border-gray-700">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="hover:text-neutral-500"
                >
                  {user.id}
                </Link>
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {user.name}
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {user.email}
              </td>
              <td className="border-t border-gray-300 py-2 pr-3 text-nowrap dark:border-gray-700">
                {capitalize(user.role)}
              </td>
              <td className="border-t border-gray-300 py-2 pr-4 dark:border-gray-700">
                {user.role === "user" && (
                  <div className="flex items-center justify-center gap-x-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <FaEye className="text-[16px]" />
                    </Link>
                    <UserDeleteButton userId={user.id} userName={user.name} />
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
