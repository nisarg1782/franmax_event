import React from "react";
import { motion } from "framer-motion";
import "./TestimonialsSection.css";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Founder, BrewHouse Café",
    quote: "Franmax India guided us in finding the perfect locations. Their team’s expertise helped us grow from one outlet to seven in less than a year!"
  },
  {
    name: "Riya Mehta",
    role: "CEO, Urban Styles",
    quote: "With Franmax India, we understood the franchise model better and expanded across three major cities effortlessly."
  },
  {
    name: "Karan Patel",
    role: "Director, FitNation",
    quote: "Their advice and market research were game-changing. Franmax India made our franchise journey smooth and profitable."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <motion.div 
        className="testimonials-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>What People Say About Franmax India</h2>
        <p>Helping businesses grow through successful franchise expansion</p>
      </motion.div>

      <motion.div 
        className="testimonials-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((t, index) => (
          <motion.div key={index} className="testimonial-card" variants={cardVariants}>
            <p className="quote">“{t.quote}”</p>
            <div className="author">
              <h4>{t.name}</h4>
              <span>{t.role}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
