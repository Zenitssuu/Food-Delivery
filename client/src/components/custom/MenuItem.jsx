import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";

function MenuItem({ menuItem, addToCart }) {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>

      <CardContent className="font-bold">
        Rs {menuItem.price.toFixed(2)}
      </CardContent>
    </Card>
  );
}

export default MenuItem;
