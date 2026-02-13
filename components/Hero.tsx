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
            className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed text-center mx-auto lg:text-left"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center lg:justify-start lg:items-start"
          >
            <input
              autoComplete="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              className="bg-[#e2e8f0]/50 rounded-lg shadow-md py-4 px-6 skeuomorphic-input"
            />
            <button className="hero-button translate-y-1">
              <div><span>{t("cta")}</span></div>
            </button>
          </motion.div>
        </div>

        {/* Right side - Image Background */}
        <div className="relative block my-14">
          <div
            className="absolute inset-0 bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('/hero.png')" }}
          />
        </div>
      </div>
    </section>
  );
}
