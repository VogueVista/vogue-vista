import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WardrobeContext } from "../context/WardrobeContext";
import "../Wardrobe.css";

const Wardrobe = () => {
  const { closet, setCloset } = useContext(WardrobeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 📤 Upload clothing item
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onload = () => {
      const newItem = {
        id: Date.now(),
        image: reader.result,
        mimeType: file.type || "image/png",
        name: file.name,
        createdAt: new Date().toISOString(),

        // 🤖 placeholders for future AI tagging
        type: "unknown",
        color: "unknown",
        style: "unknown",
      };

      setCloset((prev) => [newItem, ...prev]);
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // 🗑 delete single item
  const deleteItem = (id) => {
    setCloset((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 clear all items
  const clearWardrobe = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire wardrobe?"
    );

    if (confirmClear) {
      setCloset([]);
    }
  };

  return (
    <div className="wardrobe-page">

      {/* HEADER */}
      <div className="wardrobe-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
          aria-label="Go back home"
        >
          ← Back
        </button>
        <h1>Your Wardrobe</h1>
        <p>
          Build your digital closet. Upload clothes and let AI style your outfits.
        </p>
      </div>

      {/* UPLOAD AREA */}
      <div className="upload-section">
        <label className="upload-btn">
          + Upload Clothing
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>

        {closet.length > 0 && (
          <button className="clear-btn" onClick={clearWardrobe}>
            Clear Wardrobe
          </button>
        )}
      </div>

      {/* LOADING STATE */}
      {loading && (
        <p className="loading-text">Adding item to your wardrobe...</p>
      )}

      {/* CLOSET GRID */}
      <div className="closet-grid">
        {closet.length === 0 ? (
          <div className="empty-state">
            <h3>Your wardrobe is empty</h3>
            <p>Upload your first outfit piece to get started ✨</p>
          </div>
        ) : (
          closet.map((item) => (
            <div className="closet-item" key={item.id}>
              <img src={item.image} alt="clothing item" />

              {/* hover actions */}
              <div className="item-overlay">
                <button onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>

              {/* optional metadata (hidden for now but useful later) */}
              <div className="item-meta">
                <span>{item.type}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wardrobe;