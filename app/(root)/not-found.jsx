import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex-1 flex-center flex-col">
      <h2 className="text-8xl font-bold tracking-wide mb-4">404</h2>
      <h3 className="text-xl mb-4">Oops! Nothing here.</h3>
      <p>Sorry, we can&apos;t find the page you&apos;re looking for.</p>
      <p>Try checking the URL or head back to home.</p>
      <Link href="/" className="button-primary mt-8">
        Go Home
      </Link>
    </main>
  );
}
