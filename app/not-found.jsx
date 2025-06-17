import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex-center mx-auto h-[calc(100vh-200px)] flex-col">
      <h2 className="mb-4 text-8xl font-bold tracking-wide">404</h2>
      <h3 className="mb-4 text-xl">Page not found</h3>
      <p>Sorry, we can&apos;t find the page you&apos;re looking for.</p>
      <p>Try checking the URL or head back to home.</p>
      <Link href="/" className="button-primary mt-10">
        Go Home
      </Link>
    </main>
  );
}
