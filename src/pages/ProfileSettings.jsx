import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImage from "../utils/getCroppedImg.js";
import api from "../api/axios.js";
import styles from "./ProfileSettings.module.css";
import { uploadImageToCloud } from "../utils/uploadImageToCloud.js";

export default function ProfileSettings() {
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cropper States
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await api.get("/auth/me");
        const userData = res.data;
        setUser(userData);
        setInitialUser(userData);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setImageSrc(imageURL);
    setShowCropper(true);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

const handleSaveCroppedImage = async () => {
  try {
    const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);

    // Convert blob → file for Cloudinary
    const file = new File([croppedImage], "avatar.jpg", { type: "image/jpeg" });

    // Upload to Cloudinary
    const avatarUrl = await uploadImageToCloud(file);
    if (!avatarUrl) {
      alert("Upload failed");
      return;
    }

    // Send URL to backend
    const res = await api.put("/auth/me/avatar", { avatarUrl });

    // Update UI
    setUser({ ...user, picture: res.data.picture });

    setShowCropper(false);
    setImageSrc(null);
    setCroppedAreaPixels(null);

    alert("Profile photo updated!");
  } catch (err) {
    console.error(err);
    alert("Failed to upload photo");
  }
};


  const handleInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  // Check if there are any changes from initial user data
  const hasChanges = useMemo(() => {
    if (!user || !initialUser) return false;
    return (
      // user.username !== initialUser.username ||
      // user.email !== initialUser.email ||
      user.leetcode !== initialUser.leetcode ||
      user.upi !== initialUser.upi
    );
  }, [user, initialUser]);

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      await api.put("/auth/me", {
        // username: user.username,
        leetcode: user.leetcode,
        upi: user.upi,
      });
      setInitialUser(user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save changes:", err);
      alert("Failed to save changes");
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Profile Settings</h1>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Profile Settings</h1>
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          <p>{error || "Failed to load profile"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* PAGE TITLE */}
      <h1 className={styles.pageTitle}>Profile Settings</h1>

      {/* PROFILE HEADER */}
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
          <img src={user.picture || user.photo} className={styles.avatar} alt="User" />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div>
          <h2 className={styles.username}>{user.username}</h2>
          <p className={styles.small}>Email: {user.email}</p>
          <p className={styles.small}>LeetCode: {user.leetcode || "Not set"}</p>
          <p className={styles.small}>UPI: {user.upi || "Not set"}</p>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <h4>-</h4>
          <p>Total Prize Earned</p>
        </div>

        <div className={styles.statCard}>
          <h4>-</h4>
          <p>Rooms Joined</p>
        </div>

        <div className={styles.statCard}>
          <h4>-</h4>
          <p>Winner</p>
        </div>
      </div>

      {/* EDIT FORM */}
      <div className={styles.section}>
        <h3>Edit Profile</h3>

        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            disabled
            className={styles.disabledInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={user.email || ""}
            disabled
            placeholder="Your email address"
            className={styles.disabledInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label>LeetCode ID</label>
          <input
            type="text"
            name="leetcode"
            value={user.leetcode || ""}
            onChange={handleInput}
            placeholder="Enter your LeetCode ID"
          />
        </div>

        <div className={styles.formGroup}>
          <label>UPI ID</label>
          <input
            type="text"
            name="upi"
            value={user.upi || ""}
            onChange={handleInput}
            placeholder="Enter your UPI ID"
          />
        </div>

        <button
          className={styles.saveBtn}
          disabled={!hasChanges}
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>

      {/* CROP MODAL */}
      {showCropper && (
        <div className={styles.cropOverlay}>
          <div className={styles.cropModal}>
            <h3 className={styles.cropTitle}>Adjust Your Profile Photo</h3>

            <div className={styles.cropArea}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className={styles.zoomSlider}
            />

            <div className={styles.cropButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowCropper(false)}
              >
                Cancel
              </button>

              <button
                className={styles.cropSaveBtn}
                onClick={handleSaveCroppedImage}
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
