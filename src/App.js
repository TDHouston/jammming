import React, { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import TrackList from "./components/TrackList/Tracklist.jsx";

function App() {
  const [tracks, setTracks] = useState([
    { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Track 2", artist: "Artist 2", album: "Album 2" },
    { id: 3, name: "Track 3", artist: "Artist 3", album: "Album 3" },
  ]);

  return (
    <>
      <div className="app">
        <h1>JAMMMING</h1>
        <SearchBar />
      </div>
      <main>
        <TrackList tracks={tracks} />
      </main>
    </>
  );
}

export default App;
