import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <h1>About LeetComp</h1>

      <p>
        <strong>LeetComp</strong> is a skill-based competitive coding platform
        built by a passionate team of seven students known as{" "}
        <strong>Thenga Coders</strong> from the National Institute
        of Technology Calicut. Users compete by solving LeetCode problems, climb
        leaderboards, and win prize pools — all in a transparent and skill-based
        manner.
      </p>

      <h2>Our Vision</h2>
      <p>
        To build India’s most transparent, fair, and community-driven
        competitive coding ecosystem that rewards consistency, discipline, and
        real effort — not luck.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>Create or join rooms based on LeetCode problem solving</li>
        <li>Real-time leaderboard & streaks updated via LeetCode APIs</li>
        <li>Entry-fee rooms with cash prizes (100% prize pool given to winners)</li>
        <li>Prize splitting when multiple users tie</li>
        <li>Zero commission — every rupee contributed by users is rewarded back</li>
        <li>Clean UI, seamless experience, and fair competition</li>
      </ul>

      <h2>Who Are We?</h2>
      <p>
        We are a group of seven NIT Calicut students known as{" "}
        <strong>Thenga Coders</strong>. We love coding, fairness, product design,
        and building cool community-driven projects. LeetComp is not a registered
        company — it is a student-built platform with a commitment to ethics,
        transparency, and user trust.
      </p>

      <h2>Open Source Contributions</h2>
      <p>
        LeetComp proudly welcomes open-source contributions from developers
        worldwide. Anyone can contribute by submitting issues, improving features,
        fixing bugs, enhancing UI, or creating new ideas.
      </p>
      <p>
        You can contribute through our GitHub repository below:
      </p>
      <p>
        <a
          href="https://github.com/ThengaCoders"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0a66c2", textDecoration: "none" }}
        >
         Visit our GitHub Repository
        </a>
      </p>

      <h2>Contact</h2>
      <p>
        Email:&nbsp;
        <a
          style={styles.emailLink}
          href="mailto:thengacoders@gmail.com"
        >
          thengacoders@gmail.com
        </a>
      </p>

      <p>
        Address:{" "}
        <strong>
          National Institute of Technology Calicut, Kozhikode – 673601,
          Kerala, India
        </strong>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    lineHeight: "1.8",
    // fontFamily: "Inter, sans-serif",
  },
  
};
