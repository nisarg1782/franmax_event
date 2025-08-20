import React, { useRef, useEffect } from "react";
import "./OpportunitiesSection.css";

const opportunitiesData = [
  {
    title: "Fashion & Jewellery Franchise",
    description: [
      "Clothing brands for Men, kids and women",
      "Gold, silver, diamond, Jewellery Brands",
      "Imitation/Art Jewellery",
      "Home décor & furniture brands",
    ],
    img: "/images/fashion.jpg",
  },
  {
    title: "Food and Restaurant",
    description: [
      "Food & beverages brands/FMCG brands",
      "Restaurant, QSR’s, bars and lounge franchise",
      "Institutional suppliers, technology co’s/ restaurant apps",
      "Food delivery co’s & vehicles",
    ],
    img: "/images/food.jpg",
  },
  {
    title: "Hotel, Travel & Tourism & Entertainment",
    description: [
      "Successful travel companies",
      "Online travel services provider",
      "Hospitality business franchise",
      "Big Travel Agencies",
    ],
    img: "/images/hotel.jpg",
  },
  {
    title: "Dealer Distribution & Business Opportunities",
    description: [
      "Education Products",
      "Electronic and Electrical",
      "Pharmaceuticals & Medical Supplies",
      "Security and Protection",
      "Building and Construction",
    ],
    img: "/images/dealer.jpg",
  },
];

const OpportunitiesSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Infinite auto-scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Duplicate cards for seamless infinite scroll
    const cards = Array.from(scrollContainer.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      scrollContainer.appendChild(clone);
    });

    let speed = 1; // pixels per interval
    let interval = setInterval(() => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0; // reset to start
      } else {
        scrollContainer.scrollLeft += speed;
      }
    }, 20); // adjust for scroll speed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="opportunities-section">
      <h2>Opportunities at Franxpo</h2>
      <div className="opportunities-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>
        <div className="opportunities-cards" ref={scrollRef}>
          {opportunitiesData.map((item, index) => (
            <div className="opportunity-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <ul>
                {item.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
