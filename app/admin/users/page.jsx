import ActionIcon from "@/components/admin/ActionIcon";
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

      <table className="dark:bg-primary-200 border-primary-300 w-full border-separate rounded-lg border text-sm">
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
              <td className="border-primary-300 min-w-[180px] border-t py-2 pr-3 pl-4">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="hover:text-primary-700"
                >
                  {user.id}
                </Link>
              </td>
              <td className="border-primary-300 border-t py-2 pr-3 text-nowrap">
                {user.name}
              </td>
              <td className="border-primary-300 border-t py-2 pr-3 text-nowrap">
                {user.email}
              </td>
              <td className="border-primary-300 border-t py-2 pr-3 text-nowrap">
                {capitalize(user.role)}
              </td>
              <td className="border-primary-300 border-t py-2 pr-4">
                {user.role === "user" && (
                  <div className="flex items-center justify-center gap-x-2">
                    <ActionIcon href={`/admin/users/${user.id}`}>
                      <FaEye className="text-[16px]" />
                    </ActionIcon>
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
