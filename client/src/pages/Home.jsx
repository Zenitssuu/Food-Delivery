import React from "react";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar from "@/components/searchbar/SearchBar.jsx";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues) => {
    navigate({
      pathname: `/allrestaurants/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className='className="flex flex-col gap-12'>
      <div className="md:px-36 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar placeholder="Search by city or town" onSubmit={handleSearchSubmit}/>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
}

export default Home;
