import React from "react";
import PlaylistCard from "./PlaylistCard";
import findLocally from "../utils/getFromLocalStorage";

export default function SpotifyList({ localData, updateLocalData }) {
  const handleDrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    updateLocalData(JSON.parse(data), "add");
  };

  const handleDragover = (ev) => {
    ev.preventDefault();
  };

  return (
    <div>
      <div className="section-header h5 text-white mb-5">Saved playlist</div>
      <div
        className="list-wrapper"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragover(e)}
      >
        {localData?.length ? (
          localData.map((item) => {
            const savedLocally =
              localData?.length && findLocally(item.id, localData);

            const props = {
              key: item.id,
              item: item,
              savedLocally: savedLocally,
              updateLocalData: updateLocalData,
              draggable: false,
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
    </div>
  );
}
