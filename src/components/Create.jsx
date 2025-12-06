import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ IMPORTING THE CUSTOM API INSTANCE (Handles Tokens)
import api from '../api/axios'; 
import styles from './Create.module.css';
import { pre } from "framer-motion/client";

const CreateRoom = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    roomName: '',
    description: '',
    roomCode: '',
    cost: '',
    endDate: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // --- 1. HANDLE IMAGE SELECTION ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // --- 2. HANDLE TEXT INPUT ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- 3. HELPER: UPLOAD TO CLOUD ---
  const uploadImageToCloud = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Your Cloud Name
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Your Unsigned Preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Cloudinary Upload Failed");
      
      const data = await res.json();
      console.log("Cloudinary Response:", data);
      return data.secure_url; 

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed! Please try again.");
      return null;
    }
  };

  // --- HANDLE IMAGE REMOVAL ---
  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent triggering the upload click
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  const handleFreeJoin = async (roomId) => {
    try {
      const res = await api.post(`/api/rooms/${roomId}/join`);
      navigate(`/rooms/${roomId}`);
    } catch (err) {
      console.error(err);
      alert("Error joining room");
      navigate(`/rooms/search`);
    }
  };

  const handlePaidJoin = async (roomName, roomId) => {
    try {
      const orderRes = await api.post("/api/payments/create-order", {
        roomId: roomId,
      });

      const { order } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        prefill: {
          name: roomName,
        },

        handler: async function (response) {

          await api.post("/api/payments/verify-payment", response);

          alert("Payment successful!");
          navigate(`/rooms/${roomId}`);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
      navigate(`/rooms/search`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImgUrl = "";

      // STEP A: Upload Image to Cloudinary
      if (selectedFile) {
        finalImgUrl = await uploadImageToCloud(selectedFile);
        if (!finalImgUrl) {
          setIsSubmitting(false);
          return; // Stop if upload failed
        }
      } else {
        alert("Please select a room image!");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        room_code: Number(formData.roomCode), 
        name: formData.roomName,
        description: formData.description,
        image_url: finalImgUrl,
        cost: Number(formData.cost),     
        end_date: formData.endDate
      };

      console.log("Sending Payload to /api/rooms:", payload);
      const res = await api.post("/api/rooms", payload); 
      console.log("Room Created Success:", res.data);
      setIsSubmitting(false);
      alert("Room Created Successfully!");
      if(res.data.cost === 0){
        handleFreeJoin(res.data.id);
      }
      else{
        handlePaidJoin(res.data.roomName, res.data.id);
      }

    } catch (err) {
      console.error("Error creating room:", err);
      // Optional: Check if err.response exists to show specific backend error
      const errorMsg = err.response?.data?.message || "Failed to create room.";
      setIsSubmitting(false);
      alert(errorMsg);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Room</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* IMAGE UPLOADER - Full Width */}
        <div className={styles.formImageSection}>
          <div 
            className={styles.imageUploadBox} 
            onClick={() => fileInputRef.current.click()}
          >
            {imagePreview ? (
              <>
              <img src={imagePreview} alt="Room Preview" className={styles.previewImage} />
               <button 
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={handleRemoveImage}
                  aria-label="Remove image"
                >
                  ✕
                </button>
                </>
            ) : (
              <div className={styles.placeholder}>
                <i className="fa-solid fa-plus"></i>
                <span>Upload Image</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              hidden 
              accept="image/*"
            />
          </div>
        </div>

        {/* TWO COLUMN GRID */}
        <div className={styles.formGrid}>
          {/* LEFT COLUMN */}
          <div className={styles.inputGroup}>
            <label>Room Name</label>
            <input 
              type="text" 
              name="roomName" 
              value={formData.roomName}
              onChange={handleInputChange}
              placeholder="Enter room name"
              required
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.inputGroup}>
            <label>Entry Cost (₹)</label>
            <input 
              type="number" 
              name="cost" 
              value={formData.cost}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              required
            />
          </div>

          {/* LEFT COLUMN */}
          <div className={styles.inputGroup}>
            <label>Room Code (Numbers only)</label>
            <input 
              type="number" 
              name="roomCode" 
              placeholder="Ex: 2025" 
              value={formData.roomCode}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.inputGroup}>
            <label>End Date</label>
            <input 
              type="date" 
              name="endDate" 
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DESCRIPTION - Full Width */}
          <div className={`${styles.inputGroup} ${styles.formFullWidth}`}>
            <label>Room Description</label>
            <textarea 
              name="description" 
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your room..."
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Room"}
        </button>

      </form>
    </div>
  );
};

export default CreateRoom;