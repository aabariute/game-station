"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import FilterOption from "./FilterOption";
import SortBy from "./SortBy";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price Low-High" },
  { value: "price-desc", label: "Price High-Low" },
  { value: "discount", label: "Discount" },
];

export default function FilterModal({ filterOptions }) {
  const { categories, brands, colors } = filterOptions;

  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleSort(sort) {
    if (sort === "") return router.push(`/products`);

    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleFilter(filterBy, filter) {
    const params = new URLSearchParams(searchParams);

    let activeFilters = searchParams.get(filterBy)?.split(",") || [];

    if (activeFilters.includes(filter)) {
      activeFilters = activeFilters.filter((f) => f !== filter);
    } else {
      activeFilters = [...activeFilters, filter];
    }

    if (activeFilters.length > 0) {
      params.set(filterBy, activeFilters.join(","));
    } else {
      params.delete(filterBy);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <button
        className="border-primary-900 cursor-pointer border-b text-xl"
        onClick={() => setIsOpen(true)}
      >
        Filter & Sort
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="flex-center fixed inset-0 w-screen bg-black/40">
          <DialogPanel
            transition
            className="md:border-primary-200 fixed top-0 bottom-0 left-0 flex h-full w-full flex-col bg-white p-6 duration-300 data-closed:-translate-x-full md:w-[530px] md:border-r dark:bg-black"
          >
            <div className="flex-between border-primary-300 border-b-2 pb-4">
              <h3 className="text-2xl font-semibold">Filter & Sort</h3>
              <IoClose
                onClick={() => setIsOpen(false)}
                className="hover:text-accent-magenta cursor-pointer text-3xl"
              />
            </div>

            <div className="divide-primary-200 mt-2 mb-6 flex flex-col divide-y overflow-y-auto px-1">
              <SortBy options={sortOptions} handleSort={handleSort} />
              <FilterOption
                label="category"
                items={categories}
                handleFilter={handleFilter}
              />
              <FilterOption
                label="brand"
                items={brands}
                handleFilter={handleFilter}
              />
              <FilterOption
                label="color"
                items={colors}
                handleFilter={handleFilter}
              />
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <button
                className="button-primary"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
              <button
                className="button-secondary"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/products");
                }}
              >
                Clear
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
