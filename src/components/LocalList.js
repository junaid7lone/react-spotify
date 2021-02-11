import React from "react";
import PlaylistCard from "./PlaylistCard";
import findLocally from "../utils/getFromLocalStorage";

export default function SpotifyList({ localData, updateLocalData }) {
  return (
    <div>
      <div className="section-header h5 text-white mb-5">Saved playlist</div>
      {localData?.length ? (
        localData.map((item) => {
          const savedLocally =
            localData?.length && findLocally(item.id, localData);

          const props = {
            key: item.id,
            item: item,
            savedLocally: savedLocally,
            updateLocalData: updateLocalData,
          };

          return <PlaylistCard {...props} />;
        })
      ) : (
        <div className="text-white text-center">
          Create some awesome playlist to listen!<br></br>
          Click "Add to my list" button on the playlist you lick
        </div>
      )}
    </div>
  );
}
