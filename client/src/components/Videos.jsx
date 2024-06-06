import React from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Videos() {
  return (
    <div className="video-container">
      <img
        className="full-width-image"
        src="https://res.cloudinary.com/dmfzplfra/image/upload/v1711538599/VENICE/Portada/Design_9_ochsp0.png"
        alt=""
      />
      <div className="video-group">
        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1711328297/VENICE/VIDEOS/nike_tgxmuk.mp4"
        />
        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1714487422/VENICE/VIDEOS/ADIDAS_f8cpzn.mp4"
        />
      </div>
      <div className="video-group">
        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1714490039/VENICE/VIDEOS/Active_and_Dynamic_Sports_1_txjhtm.mp4"
        />

        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1714489130/VENICE/VIDEOS/Calvin_Klein_The_Epitome_of_Style_zgcv2x.mp4"
        />
      </div>
    </div>
  );
}
