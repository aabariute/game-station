"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (query === "") return;

    const queryString = `?q=${query}`;
    router.push(`/products${queryString}`);
    setQuery("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative col-span-2 row-start-2 lg:w-full"
    >
      <input
        className="input"
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
      >
        <PiMagnifyingGlassLight className="text-[28px]" />
      </button>
    </form>
  );
}
