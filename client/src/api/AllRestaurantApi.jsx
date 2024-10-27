import axios from "axios";
import { useQuery } from "react-query";

export const useSearchRestaurant = (searchState, city) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState?.searchQuery || "");
    params.set("page", searchState?.page || "1");
    params.set("selectedCuisines",searchState?.selectedCuisines.join(",") || []);
    params.set("sortOption",searchState?.sortOption || "bestMatch");


    const resp = await axios.get(
      `/allrestaurants/search/${city}?${params.toString()}`
    );

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error("Failed to get restaurant");
    }

    return resp.data;
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants",searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
