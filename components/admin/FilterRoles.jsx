"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterRoles({ roles }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  let activeFilters = searchParams.get("role")?.split(",") || [];

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    if (activeFilters.includes(filter)) {
      activeFilters = activeFilters.filter((f) => f !== filter);
    } else {
      activeFilters = [...activeFilters, filter];
    }

    if (activeFilters.length > 0) {
      params.set("role", activeFilters.join(","));
    } else {
      params.delete("role");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-5">
      {roles.map((role, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={activeFilters.includes(role.value)}
            id={role.label}
            onChange={() => handleFilter(role.value)}
          />
          <label htmlFor={role.label} className="text-sm">
            {role.label}
          </label>
        </div>
      ))}
    </div>
  );
}
