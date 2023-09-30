import React from "react";
import ImageGallery from "react-image-gallery";
import "./style.css";

const GalleryWithTextAndButton = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const renderItem = (item) => {
    const image = item.original;
    const text = item.text;
    const link = item.link;

    return (
      <div className="image-gallery-item po_item">
        <img
          src={image}
          alt=""
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
        <div className="image-gallery-text">
          <p style={{ textAlign: "center" }}>{text}</p>
          <a href={link}>
            <button style={{ textAlign: "center" }}>View Project</button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="gallery">
      <ImageGallery
        items={images}
        renderItem={renderItem}
        onImageChange={handleImageChange}
      />
    </div>
  );
};

export default GalleryWithTextAndButton;
