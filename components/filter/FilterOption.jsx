import { capitalize } from "@/lib/utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { IoChevronDownOutline } from "react-icons/io5";

export default function FilterOption({ label, items, handleFilter }) {
  const searchParams = useSearchParams();
  const activeFilters = searchParams.get(label)?.split(",") || [];

  return (
    <Disclosure as="div">
      <DisclosureButton className="group flex-between pb-4 pt-6 w-full">
        {capitalize(label)}
        <IoChevronDownOutline className="w-5 group-data-open:rotate-180" />
      </DisclosureButton>

      <DisclosurePanel as="ul" className="mx-2 mb-4 flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={item}
              checked={activeFilters.includes(item)}
              onChange={() => handleFilter(label, item)}
            />
            <label htmlFor={item} className="text-sm w-full">
              {item}
            </label>
          </li>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}
