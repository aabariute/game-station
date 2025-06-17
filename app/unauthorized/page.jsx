import Link from "next/link";

export const metadata = {
  title: "Unauthorized Access",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex-center mx-auto h-[calc(100vh-200px)] flex-col">
      <h1 className="mb-4 text-4xl font-bold tracking-wide">
        Unauthorized Access
      </h1>
      <p className="mb-12 text-xl">
        You do not have permission to access this page.
      </p>
      <Link href="/" className="button-primary">
        Return Home
      </Link>
    </main>
  );
}
