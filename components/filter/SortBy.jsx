import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

export default function SortBy({ options, handleSort }) {
  const searchParams = useSearchParams();

  return (
    <Disclosure
      as="div"
      className="border-b border-b-neutral-200 dark:border-b-neutral-800"
    >
      <DisclosureButton className="group flex-between pb-4 pt-6 w-full">
        Sort By
        <IoChevronDownOutline className="w-5 group-data-open:rotate-180" />
      </DisclosureButton>

      <DisclosurePanel as="ul" className="mx-2 mb-4 flex flex-col gap-1">
        {options.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="radio"
              id={item.label}
              name="sort"
              checked={
                searchParams.get("sort") === null
                  ? item.value === "newest"
                  : item.value === searchParams.get("sort")
              }
              onChange={() => handleSort(item.value)}
            />
            <label htmlFor={item.label} className="text-sm w-full">
              {item.label}
            </label>
          </div>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}
