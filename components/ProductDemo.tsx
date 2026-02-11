"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollFadeSection from "./ScrollFadeSection";
import { useTranslations } from "@/context/translations/TranslationsContext";

const demoScreenshots = [
  "/screenshots/download.png",
  "/screenshots/setup.png",
  "/screenshots/enjoy.png",
];

const howItWorksSteps = ["download", "setup", "enjoy"];

export default function ProductDemo() {
  const t = useTranslations("demo");
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const demoSection = document.getElementById("product-demo");

      if (demoSection) {
        const rect = demoSection.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionHeight = rect.height;

        // Calculate which screenshot to show based on scroll position
        const scrollProgress = Math.max(
          0,
          Math.min(
            1,
            (scrollY - sectionTop + windowHeight) /
              (sectionHeight + windowHeight),
          ),
        );

        const screenshotIndex = Math.floor(
          scrollProgress * demoScreenshots.length,
        );
        setCurrentScreenshot(
          Math.min(screenshotIndex, demoScreenshots.length - 1),
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollFadeSection>
      <section id="product-demo" className="min-h-[400vh] bg-surface">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <motion.h2
                key={currentScreenshot}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-display text-section"
              >
                {t("title")}
              </motion.h2>

              <motion.p
                key={`subtitle-${currentScreenshot}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-text-secondary mb-8"
              >
                {t("subtitle")}
              </motion.p>

              {/* Feature cards */}
              <div className="space-y-6">
                {howItWorksSteps.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentScreenshot === index ? 1 : 0.3,
                      y: 0,
                      scale: currentScreenshot === index ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`p-6 rounded-2xl transition-all duration-500 ${
                      currentScreenshot === index
                        ? "bg-background shadow-lg border-2 border-primary"
                        : "bg-background/50"
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-3">
                      {t(`${feature}.title`)}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {t(`${feature}.subtitle`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side - Screenshots */}
            <div className="flex justify-center">
              <motion.div
                key={currentScreenshot}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-80 h-150 bg-primary rounded-3xl p-4 shadow-2xl">
                  <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden">
                    <Image
                      src={demoScreenshots[currentScreenshot]}
                      alt={`Demo screenshot ${currentScreenshot + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"
width="320" height="568" viewBox="0 0 320 568"><rect width="320" height="568" fill="%23f5f5f5"/><text
x="160" y="284" text-anchor="middle" font-family="Arial" font-size="16" fill="%23666">Screenshot
${currentScreenshot + 1}</text></svg>`;
                      }}
                      fill
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </ScrollFadeSection>
  );
}
