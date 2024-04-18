import React, { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Playlist from "./components/Playlist/Playlist.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([
    { id: 101, name: "Song A", artist: "Artist A", album: "Album A" },
    { id: 102, name: "Song B", artist: "Artist B", album: "Album B" },
  ]);

  const addTrack = (trackToAdd) => {
    if (!playlistTracks.some((track) => track.id === trackToAdd.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, trackToAdd]);
    }
  };

  const removeTrack = (trackToRemove) => {
    setPlaylistTracks(
      playlistTracks.filter((track) => track.id !== trackToRemove.id)
    );
  };

  const handleSearch = (searchTerm) => {
    // Implement search functionality or API call to fetch tracks based on searchTerm
    console.log("Search Term:", searchTerm);
    // Update searchResults accordingly
  };

  return (
    <>
      <div className="app">
        <h1>JAMMMING</h1>
        <SearchBar onSearch={handleSearch} />
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist tracks={playlistTracks} onRemove={removeTrack} />
      </div>
    </>
  );
}

export default App;
