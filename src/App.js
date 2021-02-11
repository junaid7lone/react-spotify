import { useCallback } from "react";
import logo from "./Spotify-Logo.png";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import SpotifyList from "./components/SpotifyList";
import LocalList from "./components/LocalList";
import useLocalStorage from "./utils/UseLocalStorage";
import { fakeData } from "./utils/FakeData";
import { filter } from "lodash";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  const [playlistData, setplaylistData] = useLocalStorage("playlistData", null);

  const updateLocalData = (item, type) => {
    // const newList = [];

    if (type === "add") {
      //check for duplicate
      const itemExists = playlistData.some(
        (playlist) => playlist.id === item.id
      );

      if (!itemExists) {
        setplaylistData([...playlistData, item]);
      } else {
        //notify user
        console.log("already exists");
      }
    } else if (type === "remove") {
      const newlist = filter(
        playlistData,
        (playlist) => playlist.id !== item.id
      );
      setplaylistData(newlist);
    }
  };

  // console.log("data", playlistData);

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container className="main-container">
        <DragDropContext
          onBeforeCapture={onBeforeCapture}
          onBeforeDragStart={onBeforeDragStart}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Row>
            <Col className="list-block">
              <Droppable droppableId="list">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <SpotifyList
                      localData={playlistData}
                      updateLocalData={updateLocalData}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col className="list-block">
              <Droppable droppableId="list1">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <LocalList
                      localData={playlistData}
                      updateLocalData={updateLocalData}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </DragDropContext>
      </Container>
    </div>
  );
}

export default App;
