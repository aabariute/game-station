import { signIn } from "@/auth";
import Image from "next/image";

export default function ButtonGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
      className="text-center mb-1"
    >
      <button
        className="py-3 w-full bg-white dark:bg-neutral-600 border border-neutral-300 font-medium rounded-full flex-center gap-4 cursor-pointer"
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
