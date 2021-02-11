import React from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { FEATURED_LIST_URL, CLIENT_ID, AUTH_TOKEN } from "./Constants";
import PlaylistCard from "./PlaylistCard";
import { fakeData } from "../utils/FakeData";

const playListParams = {
  country: "IN",
  locale: "en_IN",
  time: Date.now(),
  limit: 20,
};

const params = new URLSearchParams(playListParams).toString();

// const useAxios = makeUseAxios({
//   axios: axios.create({
//     method: "get",
//     baseURL: FEATURED_LIST_URL,
//     headers: {
//       Authorization: "Bearer " + AUTH_TOKEN, //the token is a variable which holds the token
//     },
//   }),
// });

export default function SpotifyList() {
  // const [{ data, loading, error }, refetch] = useAxios(`/?${params}`);
  const data = fakeData;
  const loading = false,
    error = null;

  console.log("data", data);
  console.log("loading", loading);
  console.log("error", error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      spotify
      {data?.playlists?.items.map((item) => {
        return <PlaylistCard item={item} />;
      })}
    </div>
  );
}
