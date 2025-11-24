import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import RoomCard from "./RoomCard";
import "./RoomsSlider.css";

const RoomsSlider = ({ rooms = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (
      !swiperRef.current ||
      !prevRef.current ||
      !nextRef.current ||
      !paginationRef.current
    ) {
      return;
    }

    const swiper = swiperRef.current;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();

    swiper.params.pagination.el = paginationRef.current;
    swiper.pagination.destroy();
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, [rooms.length]);

  const syncNavState = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">My Rooms</h2>

      <div className="slider-wrapper">
        <button
          ref={prevRef}
          className="arrow-btn left"
          aria-label="Previous rooms"
          disabled={isBeginning}
        >
          ‹
        </button>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          className="slider-swiper"
          spaceBetween={32}
          speed={450}
          slidesPerView={3}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncNavState(swiper);
          }}
          onSlideChange={syncNavState}
          onResize={syncNavState}
          navigation
          pagination={{
            clickable: true,
            bulletClass: "dot",
            bulletActiveClass: "dot active",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.id}>
              <RoomCard room={room} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={nextRef}
          className="arrow-btn right"
          aria-label="Next rooms"
          disabled={isEnd}
        >
          ›
        </button>
      </div>

      <div className="pagination" ref={paginationRef}></div>
    </div>
  );
};

export default RoomsSlider;
