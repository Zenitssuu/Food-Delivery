import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.jsx";
import DetailsSection from "./DetailsSection.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import CuisinesSection from "./CuisinesSection.jsx";
import MenuSection from "./MenuSection.jsx";
import ImageSection from "./ImageSection.jsx";
import LoadingButton from "@/components/custom/LoadingButton.jsx";
import { Button } from "@/components/ui/button.jsx";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "resturant is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "delivery time must be required",
    invalid_type_error: "must be a number",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});

function ManageResturantForm({ onSave, isLoading, restaurant }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormat = parseInt(restaurant.deliveryPrice);

    const menuItemsFormat = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt(item.price),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormat,
      menuItems: menuItemsFormat,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (restaurantData) => {
    // console.log(restaurantData.restaurantName);

    const formData = new FormData();

    formData.append("restaurantName", restaurantData.restaurantName);
    formData.append("city", restaurantData.city);
    formData.append("country", restaurantData.country);
    formData.append("deliveryPrice", restaurantData.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      restaurantData.estimatedDeliveryTime.toString()
    );

    restaurantData.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    restaurantData.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    formData.append("imageFile", restaurantData.imageFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}

export default ManageResturantForm;
