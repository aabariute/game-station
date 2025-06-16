"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="mx-auto h-[calc(100vh-200px)] flex-center flex-col">
      <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>

      <p className="mb-4 text-sm text-gray-500">{error.message}</p>

      <div className="mt-10 flex-center gap-4">
        <Link href="/admin/overview" className="button-secondary">
          Go Home
        </Link>
        <button onClick={() => reset()} className="button-primary">
          Try again
        </button>
      </div>
    </main>
  );
}
