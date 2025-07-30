import React from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio.jsx";
import { Banknote, Clock, Dot } from "lucide-react";

function SearchResultCard({ restaurant }) {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="flex flex-col sm:flex-row gap-5 rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      {/* Image */}
      <div className="sm:w-1/3 w-full">
        <AspectRatio ratio={16 / 9}>
          <img
            loading="lazy"
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="rounded-lg w-full h-full object-cover"
          />
        </AspectRatio>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between sm:w-2/3 w-full gap-3">
        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
            {restaurant.restaurantName}
          </h3>

          {/* Cuisines */}
          <div className="text-sm text-gray-600 flex flex-wrap gap-1">
            {restaurant.cuisines.map((item, index) => (
              <span key={item} className="flex items-center">
                {item}
                {index < restaurant.cuisines.length - 1 && (
                  <Dot className="h-4 w-4 text-gray-400" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span>{restaurant.estimatedDeliveryTime} mins delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-orange-500" />
            <span>From ₹{restaurant.deliveryPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultCard;
