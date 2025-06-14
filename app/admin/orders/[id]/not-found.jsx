import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex-1 flex-center flex-col">
      <h2 className="text-8xl font-bold tracking-wide mb-4">404</h2>
      <p>This order could not be found.</p>
      <Link href="/admin/orders" className="button-primary mt-12">
        Back to orders
      </Link>
    </main>
  );
}
