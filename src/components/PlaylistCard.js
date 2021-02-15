import React from "react";
import { Card, Media } from "react-bootstrap";
import PlaylistPlaceholder from "../playlist-placeholder.png";

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

export default PlaylistCard;
