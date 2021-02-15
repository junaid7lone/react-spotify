import React from "react";
import { ListGroup } from "react-bootstrap";
import useAxios from "axios-hooks";
import { getAuthToken, getAuth } from "../utils/SpotifyAuth";

export default function SongsList({ url }) {
  const [{ data, loading, error }] = useAxios({
    url: url,
    method: "GET",
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) {
    getAuth();
    return <p className="text-white">Error! please refresh and try again.</p>;
  }

  return (
    <div>
      <ListGroup>
        {data.items.map((song, index) => {
          return (
            <ListGroup.Item key={index}>
              <span className="p-2">
                <a
                  className="text-black"
                  href={song.track.preview_url}
                  target="_blank"
                >
                  ▶️
                </a>
              </span>
              <span className="p-2">{song.track.name}</span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
