import logo from "./Spotify-Logo.png";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import SpotifyList from "./components/SpotifyList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
        <Row>
          <Col>
            <SpotifyList />
          </Col>
          <Col>local host</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
