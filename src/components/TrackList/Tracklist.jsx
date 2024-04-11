import React from "react";
import styles from "./TrackList.module.css";

import Track from "../Track/Track";

function TrackList(props) {
  const tracks = [
    {
      id: 0,
      name: "Myrrh",
      artist: "Naomi Sharon",
      album: "Obsidian",
    },

    {
      id: 1,
      name: "Truth or Dare",
      artist: "Tyla",
      album: "TYLA",
    },
  ];

  return (
    <>
      <div>
        {props.tracks.map((track) => {
          return (
            <Track
              id={tracks.id}
              name={tracks.name}
              artist={tracks.artist}
              album={tracks.album}
            />
          );
        })}
      </div>
    </>
  );
}

export default TrackList;
