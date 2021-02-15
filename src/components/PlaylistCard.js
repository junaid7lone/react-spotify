import React, { useState } from "react";
import { Card, Media, Accordion, Button } from "react-bootstrap";
import PlaylistPlaceholder from "../playlist-placeholder.png";

import SongsList from "./SongsList.js";

const PlaylistCard = (props) => {
  const { item, savedLocally, updateLocalData, draggable, onDrag } = props;

  const handleDragStart = (e) => {
    onDrag(e, JSON.stringify(item));
  };

  return (
    <Card
      key={item.id}
      style={{ marginBottom: "20px" }}
      draggable={draggable}
      onDragStart={(e) => handleDragStart(e)}
      id={item.id}
      className={draggable ? "draggable" : ""}
    >
      <Card.Body>
        <Media>
          <Thumbnail
            imageUrl={item.images[0].url ?? null}
            listName={item.name}
          />
          <Media.Body>
            <h5 className="media-header">
              {item.name}
              <Card.Link
                href="#"
                onClick={() =>
                  updateLocalData(item, savedLocally ? "remove" : "add")
                }
                className="small"
                title={savedLocally ? "Remove from my list " : "Add to my list"}
              >
                {savedLocally ? "Remove -" : "Add +"}
              </Card.Link>
            </h5>
            <p className="mb-2 text-muted">{item.description}</p>
            <SongsExpander tracks={item.tracks} id={item.id} />
          </Media.Body>
        </Media>
      </Card.Body>
    </Card>
  );
};

const Thumbnail = ({ imageUrl, listName }) => {
  return (
    <span
      style={{
        backgroundImage: `url(${PlaylistPlaceholder})`,
        height: "64px",
        width: "64px",
        marginRight: "20px",
      }}
    >
      {imageUrl && (
        <img
          width={64}
          height={64}
          className="mr-3 thumb image"
          src={imageUrl}
          alt={listName}
        />
      )}
    </span>
  );
};

const SongsExpander = (props) => {
  const { tracks, id } = props;

  const [showTrack, toggleTracks] = useState(false);

  const onToggle = () => {
    toggleTracks(!showTrack);
  };

  return (
    <div>
      <div onClick={onToggle}>
        <span className=" small cursor-pointer">
          {showTrack ? "Hide " : "Show "}
          {tracks.total} Tracks
        </span>
      </div>
      {showTrack ? <SongsList url={tracks.href} /> : null}
    </div>
  );
};

export default PlaylistCard;
