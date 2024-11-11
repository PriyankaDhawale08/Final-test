// src/components/Carousal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

export default function Carousal() {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://www.apparelentrepreneurship.com/wp-content/uploads/2019/04/apparel_entrepreneurship_what_your_clothing_brand_needs_to_stay_relevant_2019.jpg"
            className="d-block w-100"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://www.apparelentrepreneurship.com/wp-content/uploads/2019/04/apparel_entrepreneurship_what_your_clothing_brand_needs_to_stay_relevant_2019.jpg"
            className="d-block w-100"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://example.com/your-image3.jpg"
            className="d-block w-100"
            alt="Third slide"
          />
        </div>
      </div>
    </div>
  );
}
