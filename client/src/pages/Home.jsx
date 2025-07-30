import React, { useState } from "react";
import SearchBar from "@/components/searchbar/SearchBar.jsx";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues) => {
    navigate({
      pathname: `/allrestaurants/search/${searchFormValues.searchQuery}`,
    });
  };

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [sideImageLoaded, setSideImageLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-12 px-4 md:px-20 pb-20">
      {/* Hero Section */}
      <div className="md:px-36 bg-white rounded-lg shadow-md py-10 flex flex-col gap-5 text-center -mt-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-lg md:text-xl text-gray-600">
          Food is just a click away!
        </span>
        <SearchBar
          placeholder="Search by city or town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* Promo Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mt-10">
        <div className="w-full overflow-hidden rounded-xl shadow-md">
          {!heroLoaded && <Skeleton height={400} />}
          <img
            src="https://res.cloudinary.com/dgze4nv70/image/upload/v1740395789/giurvme2fvmzmafuujci.png"
            alt="Order faster"
            className={`w-full object-cover rounded-xl transition-opacity duration-500 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setHeroLoaded(true)}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-orange-600 tracking-tight">
            Order takeaway even faster!
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Use EasyEats on mobile or desktop and get food delivered straight to
            your door.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
