import React from "react";
import { motion } from "framer-motion";
import './HomePage.css';

import Banner from './Banner';
import AboutSection from './AboutSection';
import ExclusiveRights from "./ExclusiveRights";
import ContactSection from "./ContactSection";
import OurPartners from "./OurPartners";
import CountdownTimer from "./CountdownTimer";
import TestimonialsSection from "./TestimonialsSection";
// import OpportunitiesSection from "./OpportunitiesSection";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Homepage = () => {
  return (
    <div className="homepage">
      <main className="main-content">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Banner />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ExclusiveRights />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <OurPartners />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ContactSection />
        </motion.div>
         {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <TestimonialsSection />
        </motion.div> */}

      </main>
    </div>
  );
};

export default Homepage;
