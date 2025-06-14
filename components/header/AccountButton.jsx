import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";

export default async function AccountButton() {
  const session = await auth();

  if (!session) {
    return (
      <Link href="/login">
        <PiUserCircleLight className="hover-fade-text text-[28px]" />
      </Link>
    );
  }

  return (
    <>
      <Link href="/user/profile">
        <PiUserCircleLight className="hover-fade-text text-[28px]" />
      </Link>
      <form action={signOutUser} className="flex items-center">
        <button type="submit">
          <IoIosLogOut className="hover-fade-text text-[28px]" />
        </button>
      </form>
    </>
  );
}
