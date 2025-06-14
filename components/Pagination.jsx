"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handlePagination(p) {
    if (p === 0 || p === totalPages + 1 || p === page) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", p);
    router.replace(`${pathname}?${params.toString()}`, { scroll: true });
  }

  return (
    <div className="pb-4 pt-12 flex-center gap-2">
      {page > 1 && (
        <button className="cursor-pointer text-xl text-gray-600 hover:text-pink-500">
          <IoIosArrowBack onClick={() => handlePagination(+page - 1)} />
        </button>
      )}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`px-2 py-1 border border-gray-300 dark:border-gray-700 shadow-xs rounded-md min-w-[30px] cursor-pointer duration-100 transition-color hover:shadow-sm ${
              p === +page && "bg-gray-100 dark:bg-neutral-800 hover:shadow-xs"
            }`}
            onClick={() => handlePagination(p)}
          >
            {p}
          </button>
        ))}
      </div>
      {page < totalPages && (
        <button className="cursor-pointer text-xl text-gray-600 hover:text-pink-500">
          <IoIosArrowForward onClick={() => handlePagination(+page + 1)} />
        </button>
      )}
    </div>
  );
}
