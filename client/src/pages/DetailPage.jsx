import { useGetRestaurantById } from "@/api/AllRestaurantApi.jsx";
import { useCreateCheckoutSession } from "@/api/OrderApi.jsx";
import CheckoutButton from "@/components/custom/CheckoutButton.jsx";
import MenuItem from "@/components/custom/MenuItem.jsx";
import OrderSummary from "@/components/custom/OrderSummary.jsx";
import RestaurantInfo from "@/components/custom/RestaurantInfo.jsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.jsx";
import { Card, CardFooter } from "@/components/ui/card.jsx";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";

function DetailPage() {
  const restaurantId = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(
    restaurantId.restaurant
  );

  const { isLoading: isCheckoutLoading, createCheckoutSession } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState(() => {
    // console.log(restaurantId);

    const storedCartItems = sessionStorage.getItem(
      `cartItems-${restaurantId.restaurant}`
    );
    // console.log(storedCartItems);

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const addToCart = (menuItem) => {
    setCartItems((prev) => {
      // 1. check if item is present of not
      const exisitingCartItem = prev.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      // 2. if exists increase quantity
      if (exisitingCartItem) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      //3. if not add new item
      else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      //   set the value
      sessionStorage.setItem(
        `cartItems-${restaurant._id}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData) => {
    // console.log("userformdata", userFormData);

    if (!restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
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

    const data = await createCheckoutSession(checkoutData);

    // console.log(data);
    

    window.location.href = data.url;

  };

  if (isLoading || !restaurant) {
    return <span>Loading....</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className=" rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
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
