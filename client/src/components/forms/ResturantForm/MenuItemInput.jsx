import { Button } from "@/components/ui/button.jsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import React from "react";
import { useFormContext } from "react-hook-form";

function MenuItemInput({ index, removeMenuItem }) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      {/* name */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>

            <FormControl>
              <Input
                {...field}
                placeholder="chesse Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* price */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (Rs)
              <FormMessage />
            </FormLabel>

            <FormControl>
              <Input {...field} placeholder="150" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        remove
      </Button>
    </div>
  );
}

export default MenuItemInput;
