"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="flex-center mx-auto h-[calc(100vh-200px)] flex-col">
      <h2 className="mb-4 text-xl font-semibold">Something went wrong!</h2>

      <p className="text-primary-500 mb-4 text-sm">{error.message}</p>

      <div className="flex-center mt-10 gap-4">
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
