import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { IoChevronDownOutline } from "react-icons/io5";

export default function SortBy({ options, handleSort }) {
  const searchParams = useSearchParams();

  return (
    <Disclosure
      as="div"
      className="border-b border-b-neutral-200 dark:border-b-neutral-800"
    >
      <DisclosureButton className="group flex-between w-full pt-6 pb-4">
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
            <label htmlFor={item.label} className="w-full text-sm">
              {item.label}
            </label>
          </div>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}
