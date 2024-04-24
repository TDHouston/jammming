import React, { useState } from "react";
import TrackList from "../TrackList/Tracklist";
import "./Playlist.css";

function Playlist({
  tracks,
  onRemove,
  playlistName,
  updatePlaylistName,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    updatePlaylistName(e.target.value);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div className="Playlist">
      {isEditing ? (
        <input
          value={playlistName}
          onChange={handleNameChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
          onFocus={handleFocus}
          onKeyDown={handleKeyPress}
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{playlistName}</h2>
      )}
      <TrackList tracks={tracks} onRemove={onRemove} />
      <button
        className="Playlist-save"
        onClick={() =>
          onSave(
            playlistName,
            tracks.map((track) => track.uri)
          )
        }
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
