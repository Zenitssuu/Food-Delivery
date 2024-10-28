import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Dot } from "lucide-react";

function RestaurantInfo({ restaurant }) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span key={index} className="flex">
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}

export default RestaurantInfo;
