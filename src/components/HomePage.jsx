// import React from "react";
// import { motion } from "framer-motion";
// import './HomePage.css';

// import Banner from './Banner';
// import AboutSection from './AboutSection';
// import ExclusiveRights from "./ExclusiveRights";
// import ContactSection from "./ContactSection";
// import OurPartners from "./OurPartners";
// import CountdownTimer from "./CountdownTimer";
// import TestimonialsSection from "./TestimonialsSection";
// // import OpportunitiesSection from "./OpportunitiesSection";

// const sectionVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
// };

// const Homepage = () => {
//   return (
//     <div className="homepage">
//       <main className="main-content">

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={sectionVariants}
//         >
//           <Banner />
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={sectionVariants}
//         >
//           <AboutSection />
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={sectionVariants}
//         >
//           <ExclusiveRights />
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={sectionVariants}
//         >
//           <CountdownTimer />
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={sectionVariants}
//         >
//           <OurPartners />
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={sectionVariants}
//         >
//           <ContactSection />
//         </motion.div>
//          {/* <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={sectionVariants}
//         >
//           <TestimonialsSection />
//         </motion.div> */}

//       </main>
//     </div>
//   );
// };

// export default Homepage;








import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import './HomePage.css';

import Banner from './Banner';
import AboutSection from './AboutSection';
import ExclusiveRights from "./ExclusiveRights";
import ContactSection from "./ContactSection";
import OurPartners from "./OurPartners";
import CountdownTimer from "./CountdownTimer";
import TestimonialsSection from "./TestimonialsSection";
import ParticipatingBrands from "./ParticipatingBrands";
// import OpportunitiesSection from "./OpportunitiesSection"



// Import your image from assets folder
import thinkingImg from "../assets/9e5d6c19234ec1aeeba6b782e7c31073.jpg";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Floating Thought Component inside Homepage.jsx
const FloatingThought = () => {
  const [showMessage, setShowMessage] = useState(false);

  // Draggable state
  const [position, setPosition] = useState({
    x: window.innerWidth - 100,
    y: window.innerHeight - 160,
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    const rect = boxRef.current.getBoundingClientRect();
    dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
  };

  const doDrag = (clientX, clientY) => {
    if (!isDragging) return;
    const boxWidth = boxRef.current.offsetWidth;
    const boxHeight = boxRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const newX = clientX - dragOffset.current.x;
    const newY = clientY - dragOffset.current.y;

    setPosition({
      x: Math.max(0, Math.min(newX, viewportWidth - boxWidth)),
      y: Math.max(0, Math.min(newY, viewportHeight - boxHeight)),
    });
  };

  const stopDrag = () => setIsDragging(false);

  // Mouse & touch events
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isDragging) {
        e.preventDefault(); // prevents website scrolling
        const touch = e.touches[0];
        doDrag(touch.clientX, touch.clientY);
      }
    };
    const handleTouchEnd = stopDrag;
    const handleMouseMove = (e) => doDrag(e.clientX, e.clientY);
    const handleMouseUp = stopDrag;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  // Keep icon inside viewport on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - (boxRef.current?.offsetWidth || 60)),
        y: Math.min(prev.y, window.innerHeight - (boxRef.current?.offsetHeight || 60)),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={boxRef}
      className="floating-thought"
      style={{ left: position.x, top: position.y, position: "fixed" }}
    >
      <img
        src={thinkingImg}
        alt="Thinking"
        className="thought-icon"
        onClick={() => setShowMessage((prev) => !prev)}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          startDrag(touch.clientX, touch.clientY);
        }}
      />
      {showMessage && (
        <div className="thought-message">
          Thinking about starting your business? <br />
          <a href="https://franmaxindia.com" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </div>
      )}
    </div>
  );
};


const Homepage = () => {
  return (
    <div className="homepage">
      <main className="main-content">

        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <Banner />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <AboutSection />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <ExclusiveRights />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <CountdownTimer />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <OurPartners />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <ParticipatingBrands />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <ContactSection />
        </motion.div>



        {/* <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <TestimonialsSection />
        </motion.div> */}

      </main>

      {/* Floating Thought Icon */}
      <FloatingThought />
    </div>
  );
};

export default Homepage;
