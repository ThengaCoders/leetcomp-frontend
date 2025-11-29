import React, { useState, useRef } from 'react';
import styles from './Create.module.css';

const CreateRoom = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    roomName: '',
    description: '',
    roomCode: '',
    endDate: ''
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form Submitted!", { imagePreview, ...formData });
    alert("Room Created Successfully! (Check Console)");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Room</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          {/* Left Column - Image Upload */}
          <div className={styles.leftColumn}>
            <div 
              className={styles.imageUploadBox} 
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Room Preview" className={styles.previewImage} />
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

          {/* Right Column - Form Fields */}
          <div className={styles.rightColumn}>
            <div className={styles.inputGroup}>
              <label>Room Name</label>
              <input 
                type="text" 
                name="roomName" 
                placeholder="Ex: Dynamic Programming Wars" 
                value={formData.roomName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Room Description</label>
              <textarea 
                name="description" 
                placeholder="What is this room about?" 
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Room Code</label>
              <input 
                type="text" 
                name="roomCode" 
                placeholder="Ex: DP-2025" 
                value={formData.roomCode}
                onChange={handleInputChange}
                required
              />
            </div>
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
          </div>
        </div>
        
        <button type="submit" className={styles.submitBtn}>Create Room</button>
      </form>
    </div>
  );
};
export default CreateRoom;