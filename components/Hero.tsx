"use client";

import { useTranslations } from "@/context/translations/TranslationsContext";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left side - Content */}
        <div className="lg:relative z-10 flex flex-col justify-center px-6 lg:px-12 xl:px-16 lg:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display text-hero mb-8 leading-tight text-center lg:text-left"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl leading-relaxed text-center mx-auto lg:text-left"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center lg:justify-start lg:items-start"
          >
            <button className="bg-primary text-secondary px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105">
              {t("cta")}
            </button>
          </motion.div>
        </div>

        {/* Right side - Image Background */}
        <div className="relative block">
          <div
            className="absolute inset-0 bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('/hero.png')" }}
          />
        </div>
      </div>
    </section>
  );
}
