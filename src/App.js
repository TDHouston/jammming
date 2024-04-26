import React, { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Playlist from "./components/Playlist/Playlist.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Spotify from "./util/Spotify.js";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for searchTerm

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("savedSearchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      handleSearch(savedSearchTerm);
      localStorage.removeItem("savedSearchTerm");
    }
  }, []);

  const handleAuthentication = () => {
    localStorage.setItem("savedSearchTerm", searchTerm); // Save the search term just before authentication
    Spotify.getAccessToken(); // Assume this initiates the OAuth flow
  };

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
    if (!Spotify.getAccessToken()) {
      handleAuthentication();
    } else {
      Spotify.search(searchTerm).then(setSearchResults);
    }
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
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          setSearchTerm={setSearchTerm}
        />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            tracks={playlistTracks}
            onRemove={removeTrack}
            playlistName={playlistName}
            updatePlaylistName={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </>
  );
}

export default App;
