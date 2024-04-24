import React, { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Playlist from "./components/Playlist/Playlist.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Spotify from "./util/Spotify.js";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };

  const handleSearch = (searchTerm) => {
    Spotify.search(searchTerm).then((searchResults) => {
      setSearchResults(searchResults);
    });
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  return (
    <>
      <div className="app">
        <h1>JAMMMING</h1>
        <SearchBar onSearch={handleSearch} />
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          tracks={playlistTracks}
          onRemove={removeTrack}
          playlistName={playlistName}
          updatePlaylistName={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </>
  );
}

export default App;
