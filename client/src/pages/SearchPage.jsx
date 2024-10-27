import { useSearchRestaurant } from "@/api/AllRestaurantApi.jsx";
import CuisineFilter from "@/components/custom/CuisineFilter.jsx";
import PaginationSelection from "@/components/custom/PaginationSelection.jsx";
import SortOption from "@/components/custom/SortOption.jsx";
import SearchBar from "@/components/searchbar/SearchBar.jsx";
import SearchResultCard from "@/components/searchbar/SearchResultCard.jsx";
import SearchResultInfo from "@/components/searchbar/SearchResultInfo.jsx";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption:"bestMatch"
  });

  // console.log(searchState.selectedCuisines);
  const [isExpanded, setIsExpanded] = useState(false);

  const { results, isLoading } = useSearchRestaurant(searchState, city);

  const setSortOption = (sortOption)=>{
    setSearchState(prev => ({
      ...prev,
      sortOption,
      page:1,
    }))
  }

  const setSelectedCuisines = (selectedCuisines) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearchQuery = (searchFormData) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchQuery((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No result found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={()=>setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState?.searchQuery || ""}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOption
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelection
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default SearchPage;
