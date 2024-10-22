import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.jsx";
import { cuisineList } from "@/config/resturant-options-config.js";
import React from "react";
import { useFormContext } from "react-hook-form";
import CusineCheckbox from "./CusineCheckbox.jsx";

function CuisinesSection() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">
          <FormDescription>
            Select the cuisines that your resturant serves
          </FormDescription>
        </h2>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (
                <CusineCheckbox cuisine={cuisineItem} field={field} key={cuisineItem}/>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CuisinesSection;
