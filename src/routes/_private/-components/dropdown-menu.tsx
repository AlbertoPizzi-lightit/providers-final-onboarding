import { useState } from "react";

import type { FilterKeys } from "./filter-container/types";
import { CheckIcon } from "./icons/check-icon";
import { FilterArrowIcon } from "./icons/filter-arrow-icon";
type DropdownMenuProps = {
  name: FilterKeys;
  filterData: (option: string, filterName: FilterKeys) => void;
  options?: string[];
};

export const DropdownMenu = ({ filterData, name, options = [] }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(options[0]);

  const toggleDropdown = () => {
    return setIsOpen((openValue) => {
      return !openValue;
    });
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    filterData(option, name);
    setIsOpen(false);
  };

  return (
    <div
      aria-label={"This is a dropdown Menu for " + name}
      className="relative w-full min-w-70 md:max-w-[70px]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className="text-base-text bg-base-background border-border focus:ring-disabled-text disabled:bg-disabled-text flex w-full items-center justify-between rounded-lg border p-3 shadow-sm focus:ring-2 focus:outline-none"
        onClick={toggleDropdown}
        type="button"
      >
        <span className="block shrink-0 truncate ps-1">{selected}</span>
        <FilterArrowIcon
          className={`text-base-text inline-block size-4 transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"} `}
        />
      </button>

      <div
        className={`bg-base-background border-border absolute z-50 mt-1 w-full overflow-hidden rounded-lg border shadow-xl transition-all transition-discrete duration-500 ${
          isOpen ? "pointer-events-auto h-auto opacity-100" : "pointer-events-none h-0 opacity-0"
        }`}
      >
        <ul
          aria-labelledby="options-menu"
          aria-orientation="vertical"
          className="max-h-60 overflow-y-auto"
          role="menu"
        >
          {options.map((option, index) => {
            const isSelected = selected === option;

            return (
              <li key={index}>
                <button
                  aria-labelledby={"This is a dropdown Menu for " + name}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm ${
                    isSelected
                      ? "bg-disabled-bg text-base-text font-medium"
                      : "text-base-text hover:bg-banner-bg"
                  } `}
                  onClick={() => {
                    return handleSelect(option);
                  }}
                  type="button"
                >
                  <span>{option}</span>

                  {isSelected ? <CheckIcon className="text-disabled-text size-4" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
