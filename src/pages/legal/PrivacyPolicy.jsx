import React from "react";

export default function PrivacyPolicy() {
    return (
        <div style={styles.container}>
            <h1>Privacy Policy</h1>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <p>
                Welcome to <strong>LeetComp</strong>. This Privacy Policy explains how we
                collect, use, and protect your information when you use our platform.
            </p>

            <h2>1. Who We Are</h2>
            <p>
                LeetComp is a skill-based competitive coding platform created by a team
                of seven students known as{" "}
        <strong>Thenga Coders</strong> from the National Institute of Technology Calicut.
                We are not a registered business entity yet and operate as an independent
                student project team.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
                <li><strong>Google Login Data</strong> (Name, Email, Profile Picture)</li>
                <li><strong>Username</strong> (chosen by you)</li>
                <li><strong>LeetCode ID</strong> (for tracking questions solved)</li>
                <li><strong>Phone Number</strong> (UPI-linked for payouts)</li>
                <li><strong>Entry Fee Payments</strong> processed securely via Razorpay</li>
                <li>Device information and analytics</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
                <li>Leaderboard generation & real-time score updates</li>
                <li>Room creation & participation management</li>
                <li>Prize pool distribution and UPI payouts</li>
                <li>Preventing fraud & ensuring fair gameplay</li>
                <li>Improving platform experience</li>
            </ul>

            <h2>4. How We Store & Secure Data</h2>
            <p>
                All data is stored securely using encrypted servers. We do not store
                sensitive financial data. Razorpay handles payment processing in a
                PCI-DSS compliant manner.
            </p>

            <h2>5. Sharing of Data</h2>
            <p>We share data only with:</p>
            <ul>
                <li>Razorpay (for processing payments)</li>
                <li>LeetCode APIs (for leaderboard updates)</li>
                <li>Legal authorities if required by Indian law</li>
            </ul>

            <h2>6. Your Rights</h2>
            <ul>
                <li>Request profile deletion</li>
                <li>Edit your information</li>
                <li>Remove LeetCode ID or phone number</li>
                <li>Close your account</li>
            </ul>

            <h2>7. Contact Us</h2>
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
