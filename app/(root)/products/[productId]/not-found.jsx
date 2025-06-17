import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex-center flex-1 flex-col">
      <h2 className="mb-4 text-8xl font-bold tracking-wide">404</h2>
      <p>This product could not be found.</p>
      <Link href="/products" className="button-primary mt-12">
        Back to products
      </Link>
    </main>
  );
}
