import Link from "next/link";

export const metadata = {
  title: "Unauthorized Access",
};

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto h-[calc(100vh-200px)] flex-center flex-col">
      <h1 className="text-4xl font-bold tracking-wide mb-4">
        Unauthorized Access
      </h1>
      <p className="text-xl mb-12">
        You do not have permission to access this page.
      </p>
      <Link href="/" className="button-primary">
        Return Home
      </Link>
    </main>
  );
}
