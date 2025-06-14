import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex-1 flex-center flex-col">
      <h2 className="text-8xl font-bold tracking-wide mb-4">404</h2>
      <p>This product could not be found.</p>
      <Link href="/admin/products" className="button-primary mt-12">
        Back to products
      </Link>
    </main>
  );
}
