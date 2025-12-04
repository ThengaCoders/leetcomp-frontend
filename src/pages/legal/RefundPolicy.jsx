import React from "react";

export default function RefundPolicy() {
  return (
    <div style={styles.container}>
      <h1>Refund & Cancellation Policy</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <p>
        This Refund Policy outlines how refunds are handled on{" "}
        <strong>LeetComp</strong>.
      </p>

      <h2>1. No-Refund Conditions</h2>
      <p>Refunds are NOT provided when:</p>
      <ul>
        <li>User voluntarily joins a room</li>
        <li>User changes mind</li>
        <li>User selects wrong room</li>
        <li>User forgets to compete</li>
        <li>Room ends normally</li>
        <li>User fails to win the room</li>
      </ul>

      <h2>2. Refund Allowed Only When:</h2>
      <ul>
        <li>Payment deducted but user not added to room</li>
        <li>Double payment detected by Razorpay</li>
        <li>System-wide crash affecting all participants</li>
        <li>Invalid or failed transaction due to technical issues</li>
      </ul>

      <h2>3. Cancellation</h2>
      <p>
        Users cannot cancel a joined room or request withdrawal after
        participation.
      </p>

      <h2>4. Contact for Refund Issues</h2>
      <p> Email:&nbsp;
                <a className={styles.emailLink} href="mailto:thengacoders@gmail.com">
                    thengacoders@gmail.com
                </a>
            </p>

      <h2>5. Address</h2>
      <p>
        National Institute of Technology Calicut, Kozhikode – 673601, Kerala,
        India
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
