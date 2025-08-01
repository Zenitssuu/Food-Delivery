import { Button } from "@/components/ui/button.jsx";
import { FormDescription, FormField, FormItem } from "@/components/ui/form.jsx";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput.jsx";

function MenuSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  }); //for dynamic array

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl from-bold">Menu</h2>
        <FormDescription>
          Create ypur menu give each item a name and a price
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <MenuItemInput
                key={field.id}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />

      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
}

export default MenuSection;
