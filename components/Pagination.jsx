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
    <div className="flex-center gap-2 pt-12 pb-4">
      {page > 1 && (
        <button className="cursor-pointer text-xl text-gray-600 hover:text-pink-500">
          <IoIosArrowBack onClick={() => handlePagination(+page - 1)} />
        </button>
      )}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`transition-color min-w-[30px] cursor-pointer rounded-md border border-gray-300 px-2 py-1 shadow-xs duration-100 hover:shadow-sm dark:border-gray-700 ${
              p === +page && "bg-gray-100 hover:shadow-xs dark:bg-neutral-800"
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
