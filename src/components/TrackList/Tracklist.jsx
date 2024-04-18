import React from "react";
import styles from "./TrackList.module.css";

import Track from "../Track/Track";

function TrackList({ tracks, onRemove, onAdd }) {
  return (
    <div>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onRemove={onRemove} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default TrackList;
