import React from "react";

export default function Contact() {
  return (
    <div style={styles.container}>
      <h1>Contact Us</h1>

      <p>
        If you have questions, support issues, refund concerns, or want to
        report bugs, you can reach the LeetComp team here:
      </p>

      <h2>Email</h2>
      <p>
                <a className={styles.emailLink} href="mailto:thengacoders@gmail.com">
                    thengacoders@gmail.com
                </a>
            </p>

      <h2>Address</h2>
      <p>
        National Institute of Technology Calicut, <br />
        Kozhikode – 673601, Kerala, India
      </p>

      <h2>Support Hours</h2>
      <p>Monday – Saturday, 9:00 AM – 7:00 PM IST</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    lineHeight: "1.8",
    fontFamily: "Inter, sans-serif",
  },
  emailLink: {
    color: "#0a66c2",
    textDecoration: "none",
    fontWeight: "500",
  },
};
