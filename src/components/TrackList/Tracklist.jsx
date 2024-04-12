import React from "react";
import styles from "./TrackList.module.css";

import Track from "../Track/Track";

function TrackList({ tracks }) {
  return (
    <div>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default TrackList;
