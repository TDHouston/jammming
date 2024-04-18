import React, { useCallback } from "react";
import styles from "./Playlist.module.css";
import TrackList from "../TrackList/Tracklist";

function Playlist({ tracks, onRemove }) {
  return (
    <div>
      <h1>Your Playlist</h1>
      <TrackList tracks={tracks} onRemove={onRemove} />
    </div>
  );
}

export default Playlist;
