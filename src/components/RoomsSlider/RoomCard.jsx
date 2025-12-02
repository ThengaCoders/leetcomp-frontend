import React from "react";
import styles from './RoomCard.module.css';
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // adjust based on your project structure
import { pre } from "framer-motion/client";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleFreeJoin = async () => {
  try {
    const res = await api.post(`/api/rooms/${room.id}/join`);
    console.log("Join Room Response:", res.data);  // 🔹 see exact error message

    navigate(`/rooms/${room.id}`);    //not checking if res,data returns success cuz backend returns roomUser not success: true ...res.data is undefined
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Error joining room");
  }
};


  const handlePaidJoin = async () => {
    try {
      const orderRes = await api.post("/api/payments/create-order", {
        roomId: room.id,
      });

      const { order } = orderRes.data;
      console.log("room:",room);
      

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        prefill: {
          name: room.name,
        },

        handler: async function (response) {

          await api.post("/api/payments/verify-payment", response);

          alert("Payment successful!");
          navigate(`/rooms/${room.id}`);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  const handleJoinClick = () => {
    if (room.isMember) {
      return navigate(`/rooms/${room.id}`);
    }

    if (room.status === "FINISHED") {
      return;
    }

    if (room.cost === 0) {
      handleFreeJoin();
    } else {
      handlePaidJoin();
    }
  };

  const timeDisplay =
    room.status === "FINISHED"
      ? "0 days 0 hrs 0 mins"
      : `${room.days} days ${room.hrs} hrs ${room.mins} mins`;

  let buttonText = "Join Room";

  if (room.status === "FINISHED" && !room.isMember) {
    buttonText = "Room Ended";
  } else if (room.isMember) {
    buttonText = "Enter Room";
  }

  const isDisabled = room.status === "FINISHED" && !room.isMember;

  return (
    <div className={styles.card} role="region" aria-label="Room preview">
      <div className={styles.hero}>
        <div className={styles["time-box"]}>{timeDisplay}</div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.info}>
        <div className={styles.field}>
          <div className={styles.label}>Room name</div>
          <div className={styles.value}>{room.name}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Participants</div>
          <div className={styles.value}>{room.participants}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Room cost</div>
          <div className={styles.value}>₹ {room.cost}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Prize pool</div>
          <div className={styles.value}>₹ {room.prize}</div>
        </div>
      </div>

      <div className={styles["join-wrap"]}>
        <button
          className={styles["join-btn"]}
          disabled={isDisabled}
          onClick={!isDisabled ? handleJoinClick : undefined}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
