import React from "react";
import RoomsSlider from "../components/RoomsSlider/RoomsSlider";

const RoomsPage = () => {
  const rooms = [
    { id: 1, title: "Room A", description: "Competitive Coding Group" },
    { id: 2, title: "Room B", description: "Daily DSA Challenge" },
    { id: 3, title: "Room C", description: "LeetCode Marathon" },
    { id: 4, title: "Room D", description: "React Mastery Room" },
    { id: 5, title: "Room E", description: "Machine Learning Room" },
    { id: 6, title: "Room F", description: "Machine Room" },
  ];

  return (
    <div className="rooms-page">
      {/* <Header /> */}
      <main className="rooms-page__main">
        <RoomsSlider rooms={rooms} />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default RoomsPage;
