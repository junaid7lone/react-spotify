import React from "react";
import { Card, Media } from "react-bootstrap";
import PlaylistPlaceholder from "../playlist-placeholder.png";

const PlaylistCard = (props) => {
  const { item } = props;

  return (
    <Card key={item.id} style={{ marginBottom: "20px" }}>
      <Card.Body>
        <Media>
          <Thumbnail imageUrl={item.images[0].url ?? null} />
          <Media.Body>
            <h5>{item.name}</h5>
            <p className="mb-2 text-muted">{item.description}</p>
          </Media.Body>
        </Media>
        <br></br>
        <Card.Link href={item.href}>Listen</Card.Link>
        <Card.Link href="#">Add to local list</Card.Link>
      </Card.Body>
    </Card>
  );
};

const Thumbnail = ({ imageUrl }) => {
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
        <img width={64} height={64} className="mr-3" src={imageUrl} />
      )}
    </span>
  );
};

export default PlaylistCard;
