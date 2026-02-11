"use client";

import { motion } from "framer-motion";
import ScrollFadeSection from "./ScrollFadeSection";
import { useTranslations } from "@/context/translations/TranslationsContext";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Simple Interface",
    description:
      "Bank-like UI that feels familiar to everyone, without the complexity of traditional wallets.",
    icon: "🏦",
  },
  {
    title: "Secure Backup",
    description:
      "Your seed phrase is safely backed up to Google Drive - a method everyone trusts and uses.",
    icon: "🔒",
  },
  {
    title: "No Chain Confusion",
    description:
      "No more explaining bridges or gas fees. We handle the complexity behind the scenes.",
    icon: "⚡",
  },
  {
    title: "Built for LATAM",
    description:
      "Designed specifically for crypto-agnostic countries with local needs and regulations in mind.",
    icon: "🌎",
  },
];

export default function FeatureSection() {
  const t = useTranslations("features");

  return (
    <ScrollFadeSection>
      <section className={`py-24 bg-background`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-display text-section mb-6"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-text-secondary max-w-3xl mx-auto"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollFadeSection>
  );
}
