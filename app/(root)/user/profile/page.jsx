import { auth } from "@/auth";
import ProfileAddressForm from "@/components/user/ProfileAddressForm";
import ProfileContactsForm from "@/components/user/ProfileContactsForm";
import { getSessionUser } from "@/lib/actions/user-actions";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role === "admin") {
    redirect("/");
  }

  const userContacts = await getSessionUser();
  const { first_name, last_name, phone_number, address } = userContacts;

  return (
    <SessionProvider session={session}>
      <div className="space-y-8">
        <article className="card-lg flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold">Name</span>
              <ProfileContactsForm />
            </div>
            <span className="text-sm">
              {first_name} {last_name}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-primary-600 font-bold">Email</span>
            <span className="text-sm">{session.user.email}</span>
          </div>
        </article>

        <article className="card-lg flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold">Address</span>
              <ProfileAddressForm
                address={address}
                phone_number={phone_number}
              />
            </div>

            {Object.keys(address).length === 0 ? (
              <div className="text-primary-500 mt-2 ml-1 text-sm italic">
                No address added
              </div>
            ) : (
              <div className="flex flex-col gap-1 text-sm">
                <span>{address.street_address}</span>
                <span>
                  {address.zip_code} {address.city}
                </span>
                <span>{address.country}</span>
                <span>{phone_number}</span>
              </div>
            )}
          </div>
        </article>
      </div>
    </SessionProvider>
  );
}
