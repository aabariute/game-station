import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex-center flex-1 flex-col">
      <h2 className="mb-4 text-8xl font-bold tracking-wide">404</h2>
      <p>This order could not be found.</p>
      <Link href="/admin/orders" className="button-primary mt-12">
        Back to orders
      </Link>
    </main>
  );
}
