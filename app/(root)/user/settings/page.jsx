import UpdatePasswordForm from "@/components/user/UpdatePasswordForm";
import DeleteAccountButton from "@/components/user/DeleteAccountButton";
import { getOAuthProvider } from "@/lib/actions/auth-actions";

export const metadata = {
  title: "Settings",
};

export default async function Page() {
  const provider = await getOAuthProvider();

  return (
    <div>
      {!provider && (
        <>
          <h3 className="mb-6 text-xl font-medium">Change Password</h3>
          <UpdatePasswordForm />
        </>
      )}

      <div className="mt-14">
        <DeleteAccountButton />

        <p className="text-primary-600 max-w-xl text-xs">
          Caution! After your account is deleted, you will no longer have access
          to your order history or any other personalized data associated with
          your account. This action is permanent and cannot be undone. If you
          choose to return in the future, you will need to create a new account.
        </p>
      </div>
    </div>
  );
}
