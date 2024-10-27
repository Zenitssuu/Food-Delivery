import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { Form } from "react-router-dom";
import { z } from "zod";
import { FormControl, FormField, FormItem,Form } from "../ui/form.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

function SearchBar({ onSubmit, onReset, placeholder, searchQuery }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  useEffect(() => {
    form.reset({searchQuery})
  },[form,searchQuery])

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${
          form.formState.errors.searchQuery &&"border-red-500"
        }`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                //   defaultValues=""
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />

       
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className=" rounded-full"
          >
            Reset
          </Button>
       

        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
}

export default SearchBar;
