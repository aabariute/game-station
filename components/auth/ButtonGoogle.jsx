import { signIn } from "@/auth";
import Image from "next/image";

export default function ButtonGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
      className="mb-1 text-center"
    >
      <button
        className="flex-center w-full cursor-pointer gap-4 rounded-full border border-neutral-300 bg-white py-3 font-medium dark:bg-neutral-600"
        type="submit"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={20}
          width={20}
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
