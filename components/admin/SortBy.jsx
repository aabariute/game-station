"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortBy({ sortOptions }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSort(sort) {
    if (sort === "") return router.push(`/products`);

    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex-center gap-4">
      <span className="text-nowrap">Sort by:</span>
      <select className="select" onChange={(e) => handleSort(e.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
