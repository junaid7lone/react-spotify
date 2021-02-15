import React from "react";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { FEATURED_LIST_URL, AUTH_TOKEN } from "./Constants";
import PlaylistCard from "./PlaylistCard";
import { fakeData } from "../utils/FakeData";
import findLocally from "../utils/getFromLocalStorage";
import { getAuthToken } from "../utils/SpotifyAuth";

const playListParams = {
  country: "IN",
  locale: "en_IN",
  time: Date.now(),
  limit: 20,
};

const params = new URLSearchParams(playListParams).toString();

const useAxios = makeUseAxios({
  axios: axios.create({
    method: "get",
    baseURL: FEATURED_LIST_URL,
    headers: {
      Authorization: "Bearer " + getAuthToken(), //the token is a variable which holds the token
    },
  }),
});

export default function SpotifyList({ localData, updateLocalData }) {
  const [{ data, loading, error }, refetch] = useAxios(`/?${params}`);

  // const data = fakeData;
  // const loading = false,
  //   error = null;

  const onDrag = (ev, data) => {
    ev.dataTransfer.setData("text", data);
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error!</p>;

  return (
    <div>
      <div className="section-header h5 text-white mb-5">
        Today's featured playlist
      </div>
      <div className="list-wrapper">
        {data?.playlists?.items.map((item, index) => {
          const savedLocally = data?.length && findLocally(item.id, localData);

          const props = {
            key: item.id,
            item: item,
            savedLocally: savedLocally,
            updateLocalData: updateLocalData,
            draggable: true,
            onDrag: onDrag,
          };

          return <PlaylistCard {...props} />;
        })}
      </div>
    </div>
  );
}
