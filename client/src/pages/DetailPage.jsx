// Updated DetailPage.jsx with fully independent layout for menu and cart

import { useGetRestaurantById } from "@/api/AllRestaurantApi.jsx";
import { useCreateCheckoutSession } from "@/api/OrderApi.jsx";
import CheckoutButton from "@/components/custom/CheckoutButton.jsx";
import OrderSummary from "@/components/custom/OrderSummary.jsx";
import React, { useState } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { getDistanceBetweenLocations } from "@/lib/getDistBetweenLocations";
import { toast } from "sonner";

function DetailPage() {
  const restaurantId = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(
    restaurantId.restaurant
  );

  const { isLoading: isCheckoutLoading, createCheckoutSession } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = sessionStorage.getItem(
      `cartItems-${restaurantId.restaurant}`
    );
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === menuItem._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId.restaurant}`,
        JSON.stringify(updatedCart)
      );
      return updatedCart;
    });
  };

  const removeFromCart = (cartItem) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item._id !== cartItem._id);
      sessionStorage.setItem(
        `cartItems-${restaurantId.restaurant}`,
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const onCheckout = async (userFormData) => {
    if (!restaurant) return;

    const userLocation = `${userFormData.city}, ${userFormData.city}`;
    const restaurantLocation = `${restaurant.city}, ${restaurant.city}`;

    try {
      const distance = await getDistanceBetweenLocations(
        restaurantLocation,
        userLocation
      );

      if (distance > 10) {
        toast.error(
          `🚫 Cannot deliver to your address. (${distance.toFixed(1)} km away)`
        );
        return;
      }
    } catch (error) {
      console.log(error);
      console.error("Error checking distance");
      toast.error("❌ Failed to verify delivery distance. Try again.");
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        address: userFormData.address,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email.toString(),
      },
    };

    toast.success("✅ Checkout started, redirecting...");
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return (
      <div className="flex flex-col gap-10 px-6 md:px-16">
        <Skeleton height={200} className="rounded-md" />
        <div className="grid md:grid-cols-[4fr_2fr] gap-10">
          <div className="flex flex-col gap-4">
            <Skeleton height={40} width={200} />
            <Skeleton height={20} width={150} />
            <Skeleton count={5} height={100} />
          </div>
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 md:px-16 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative w-full h-[280px] rounded-md overflow-hidden mb-10">
        <img
          src={restaurant.imageUrl}
          loading="lazy"
          alt="restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white">
          <h2 className="text-3xl font-bold">{restaurant.name}</h2>
          <p className="text-sm opacity-90">{restaurant.cuisines.join(", ")}</p>
        </div>
      </div>

      {/* Independent sections */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menu List */}
        <div className="w-full lg:w-2/3">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {restaurant.menuItems.length > 0 ? (
              restaurant.menuItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-32 w-full overflow-hidden rounded-t-xl">
                    <img
                      loading="lazy"
                      src={item.imageUrl || "/placeholder-food.png"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description || "Delicious item"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-orange-500 font-bold">
                        ₹{item.price}
                      </span>
                      <Button
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Add +
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No menu items available.
              </div>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/3">
          <Card className="sticky top-24">
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
