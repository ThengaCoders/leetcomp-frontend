import React from "react";

export default function TermsAndConditions() {
  return (
    <div style={styles.container}>
      <h1>Terms & Conditions</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <p>
        By using <strong>LeetComp</strong>, you agree to the following Terms &
        Conditions. Please read them carefully.
      </p>

      <h2>1. About LeetComp</h2>
      <p>
        LeetComp is a skill-based competitive coding platform developed by seven
        students known as{" "}
        <strong>Thenga Coders</strong> of NIT Calicut. Participants join or create rooms, solve
        LeetCode problems, and compete on leaderboards. Winners receive the
        entire prize pool collected from entry fees.
      </p>

      <h2>2. Eligibility</h2>
      <ul>
        <li>You must be 18+ or legally competent.</li>
        <li>You must use authentic information.</li>
        <li>You must have a valid UPI-linked phone number.</li>
      </ul>

      <h2>3. Nature of Platform</h2>
      <p>This platform is strictly:</p>
      <ul>
        <li>Skill-based (not gambling or lottery)</li>
        <li>Based on LeetCode problem solving</li>
        <li>Transparent & zero-commission</li>
      </ul>

      <h2>4. Payments</h2>
      <p>
        Entry fees are processed via Razorpay. LeetComp does not store payment
        card details. All entry fees collected form the prize pool.
      </p>

      <h2>5. Prize Distribution</h2>
      <ul>
        <li>Winner = highest score when room ends</li>
        <li>If multiple winners tie → prize split equally</li>
        <li>Payouts are sent via UPI to the verified phone number</li>
      </ul>

      <h2>6. No Commission</h2>
      <p>
        LeetComp takes <strong>0% commission</strong>. Entire prize pool goes to
        winners.
      </p>

      <h2>7. Refund Policy</h2>
      <p>Refunds are governed by our <strong>Refund & Cancellation Policy</strong>.</p>

      <h2>8. User Responsibilities</h2>
      <ul>
        <li>No cheating or artificial score manipulation</li>
        <li>No fake LeetCode accounts</li>
        <li>No system abuse or exploitation</li>
      </ul>

      <h2>9. Limitation of Liability</h2>
      <p>
        We are not liable for LeetCode API downtime, bank/UPI failures, or users
        entering incorrect information.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These terms are governed by Indian law. Any disputes fall under courts
        in Kerala.
      </p>

      <h2>11. Contact</h2>
      <p> Email:&nbsp;
                <a className={styles.emailLink} href="mailto:thengacoders@gmail.com">
                    thengacoders@gmail.com
                </a>
            </p>

      <p>
        Address: <strong>
          National Institute of Technology Calicut, Kozhikode – 673601, Kerala,
          India
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
