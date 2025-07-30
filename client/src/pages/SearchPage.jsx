import { useSearchRestaurant } from "@/api/AllRestaurantApi.jsx";
import CuisineFilter from "@/components/custom/CuisineFilter.jsx";
import PaginationSelection from "@/components/custom/PaginationSelection.jsx";
import SortOption from "@/components/custom/SortOption.jsx";
import SearchBar from "@/components/searchbar/SearchBar.jsx";
import SearchResultCard from "@/components/searchbar/SearchResultCard.jsx";
import SearchResultInfo from "@/components/searchbar/SearchResultInfo.jsx";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logo from "../assets/sad.png";

function SearchPage() {
  const { city } = useParams();

  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
    city: city, // Add this
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const { results, isLoading } = useSearchRestaurant(
    searchState,
    searchState.city
  );

  const setSortOption = (sortOption) => {
    setSearchState((prev) => ({ ...prev, sortOption, page: 1 }));
  };

  const setSelectedCuisines = (selectedCuisines) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  };

  const setPage = (page) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  const setSearchQuery = (searchFormData) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      city: searchFormData.city || prev.city, // this assumes your form provides city
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  // 🌐 Skeleton loading
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        <div className="hidden lg:block">
          <Skeleton height={400} />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton height={50} />
          <Skeleton height={30} count={1} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={180} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!results?.data?.length) {
    const hasRestaurantsInCity = results?.allAvailableCuisines?.length > 0;
    
    if (!hasRestaurantsInCity) {
      // 🏙️ No restaurants at all in this city
      return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
          <img
            src={logo}
            alt="No restaurants found"
            className="w-60 h-60 object-contain"
          />
          <h2 className="text-2xl font-semibold text-orange-500">
            We’re not in {city} yet!
          </h2>
          <p className="text-gray-600">
            Our foodies are coming soon 🍽️ — hang tight, we'll be there!
          </p>
        </div>
      );
    }

    // 🍽️ There are restaurants in the city, just not matching the current filters
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <img
          src={logo}
          alt="No matches found"
          className="w-60 h-60 object-contain"
        />
        <h2 className="text-2xl font-semibold text-orange-500">
          No tasty matches found!
        </h2>
        <p className="text-gray-600 max-w-md">
          Looks like we couldn’t find restaurants matching your filters. Don’t
          worry—we’ve got plenty of flavors to explore!
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button
            className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded"
            onClick={() =>
              setSearchState((prev) => ({
                ...prev,
                selectedCuisines: [],
                searchQuery: "",
                page: 1,
                city: prev.city,
              }))
            }
          >
            Clear Filters
          </button>

          {results?.topSuggestions?.length > 0 && (
            <>
              <p className="text-gray-500 mt-4 mb-2">Try something popular:</p>
              {results.topSuggestions.map((cuisine) => (
                <button
                  key={cuisine}
                  className="bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded"
                  onClick={() =>
                    setSearchState((prev) => ({
                      ...prev,
                      selectedCuisines: [cuisine],
                      searchQuery: "",
                      page: 1,
                    }))
                  }
                >
                  Try "{cuisine}"
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  // ✅ Main content
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
      {/* Sidebar */}
      <div className="h-fit lg:sticky top-24 max-h-[75vh] overflow-y-auto pr-2">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6">
        <div className="h-16 min-h-16 w-full flex items-center transition-all duration-300">
          <SearchBar
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
            placeholder="Search by Restaurant Name"
            onReset={resetSearch}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOption
            sortOption={searchState.sortOption}
            onChange={setSortOption}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {results.data.map((restaurant) => (
            <SearchResultCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>

        <div className="mt-4">
          <PaginationSelection
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
