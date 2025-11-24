import React from "react";
import "./RoomsSlider.css";

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <div className="room-header"></div>

      <h3 className="room-title">{room.title}</h3>
      <p className="room-desc">{room.description}</p>
    </div>
  );
};

export default RoomCard;
