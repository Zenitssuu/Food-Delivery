import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";
import { useFormContext } from "react-hook-form";

function ImageSection() {
  const { control, watch } = useFormContext();

  const existsingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Image</h2>
      <FormDescription>
        Add Image that will be displayed on your resturant listing in the search
        result. Adding a new image will overwrite the existing one.
      </FormDescription>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {existsingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existsingImageUrl}
              alt="restaurant banner"
              className=" rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}

        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ImageSection;
