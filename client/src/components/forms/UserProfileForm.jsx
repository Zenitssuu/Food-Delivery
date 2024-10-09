import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form.jsx";

import LoadingButton from "../custom/LoadingButton.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";

const FormSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  address: z.string().min(1, "address is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
});

// const zodResolver = (schema) => async (data) => {
//   try {
//     const values = schema.parse(data);
//     return { values, errors: {} };
//   } catch (error) {
//     return {
//       values: {},
//       errors: e.errors.reduce((allErrors, currentError) => {
//         allErrors[currentError.path[0]] = {
//           type: "manual",
//           message: currentError.message,
//         };
//         return allErrors;
//       }, {}),
//     };
//   }
// };

function UserProfileForm({ onSave, isLoading, getUser }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: getUser,
  });

  useEffect(() => {
    form.reset(getUser);
  }, [getUser, form]);

  console.log(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          <FormDescription>
            View and Change your profile information here
          </FormDescription>
        </div>

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled
                  className="bg-white"
                />
              </FormControl> 
            </FormItem>
          )}
        />

        {/* name */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          {/* address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* city */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* submit button */}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}

UserProfileForm.propTypes = {};

export default UserProfileForm;
