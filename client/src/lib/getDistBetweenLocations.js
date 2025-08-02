import axios from "axios";

export const getDistanceBetweenLocations = async (origin, destination) => {
  const resp = await axios.get("/distance", {
    params: {
      origin,
      destination,
    },
  });

  const data = await resp.data;
  console.log(data);
  return data.distance; // in km
};
