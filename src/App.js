import { useState, useEffect } from "react";
import logo from "./Spotify-Logo.png";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import SpotifyList from "./components/SpotifyList";
import LocalList from "./components/LocalList";
import useLocalStorage from "./utils/UseLocalStorage";
import { fakeData } from "./utils/FakeData";
import { filter } from "lodash";
import { getAuth, getAuthToken } from "./utils/SpotifyAuth";
import { ToastProvider, useToasts } from "react-toast-notifications";

function SpotifyWrapper() {
  const [playlistData, setplaylistData] = useLocalStorage("playlistData", []);
  const [accessToken, setToken] = useState("");
  const { addToast } = useToasts();

  const updateLocalData = (item, type) => {
    // const newList = [];

    if (type === "add") {
      //check for duplicate

      const itemExists = playlistData.some(
        (playlist) => playlist.id === item.id
      );

      if (!itemExists) {
        setplaylistData([...playlistData, item]);
        notify("success", `${item.name}  added to your list.`);
      } else {
        notify("warning", `${item.name}  already exists.`);
      }
    } else if (type === "remove") {
      const newlist = filter(
        playlistData,
        (playlist) => playlist.id !== item.id
      );
      setplaylistData(newlist);
      notify("info", `${item.name} removed from you list`);
    }
  };

  const notify = (type, text) => {
    addToast(text, {
      appearance: type,
      autoDismiss: true,
    });
  };

  useEffect(() => {
    const accessToken = getAuthToken() || getAuth();
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <HeaderComp />
      <Container className="main-container">
        <Row>
          <Col className="text-center text-secondary">
            Drag from left and drop to right playist to save it in your list.
          </Col>
        </Row>
        <Row>
          <Col className="list-block spotify-list-wrapper">
            {accessToken ? (
              <SpotifyList
                localData={playlistData}
                updateLocalData={updateLocalData}
              />
            ) : (
              "User not authenticated"
            )}
          </Col>
          <Col className="list-block local-list-wrapper">
            <LocalList
              localData={playlistData}
              updateLocalData={updateLocalData}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const App = () => (
  <ToastProvider>
    <SpotifyWrapper />
  </ToastProvider>
);

const HeaderComp = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <div> player will go here</div>
  </header>
);

export default App;
