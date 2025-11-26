import React from "react";
import styles from './RoomCard.module.css'

const RoomCard = ({ room }) => {
  return (
    <div className={styles.card} role="region" aria-label="Room preview">
      <div className={styles.hero} aria-hidden="false">
        <div className={styles["time-box"]}>
          {room.days}days {room.hrs}hrs {room.mins}mins
        </div>
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
        <button className={styles["join-btn"]}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
