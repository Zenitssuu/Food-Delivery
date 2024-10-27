import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import { Button } from "../ui/button.jsx";

const OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

function SortOption({ onChange, sortOption }) {
  const selectedLabel =
    OPTIONS.find((option) => option.value === sortOption)?.label ||
    OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort by: {selectedLabel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortOption;
