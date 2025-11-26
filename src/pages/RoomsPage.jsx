import React from "react";
import RoomsSlider from "../components/RoomsSlider/RoomsSlider";

const RoomsPage = () => {
  const rooms = [
    { name: "Apple Room", participants: 100, cost: 100, prize: 10000, days: 20, hrs: 20, mins: 2 },
    { name: "Banana Room", participants: 200, cost: 100, prize: 20000, days: 20, hrs: 20, mins: 2 },
    { name: "Choco Room", participants: 300, cost: 100, prize: 30000, days: 20, hrs: 20, mins: 2 },
    { name: "Dream Room", participants: 400, cost: 100, prize: 40000, days: 20, hrs: 20, mins: 2 },
    { name: "Egg Room", participants: 500, cost: 100, prize: 50000, days: 20, hrs: 20, mins: 2 },
    { name: "Falooda Room", participants: 600, cost: 100, prize: 60000, days: 20, hrs: 20, mins: 2 },
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
