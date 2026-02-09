"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollFadeSection({
  children,
  className = "",
}: ScrollFadeSectionProps) {
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate scroll progress through the section
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)),
      );

      // Create fade in/out effect over 4 scroll positions
      let newOpacity = 0;

      if (scrollProgress < 0.25) {
        // First quarter: fade in
        newOpacity = scrollProgress * 4;
      } else if (scrollProgress < 0.75) {
        // Middle half: fully visible
        newOpacity = 1;
      } else {
        // Last quarter: fade out
        newOpacity = (1 - scrollProgress) * 4;
      }

      setOpacity(Math.max(0, Math.min(1, newOpacity)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className={`transition-opacity duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
