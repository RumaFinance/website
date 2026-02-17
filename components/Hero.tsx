"use client";

import { useTranslations } from "@/context/translations/TranslationsContext";
import { getUserLocation, submitToNotion } from "@/lib/notion";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { Ref, useRef } from "react";
import Image from "next/image";

interface SlideProps {
  title: string;
  description: string;
  ref: Ref<HTMLDivElement | null>;
  y: any;
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Slide({ title, description, ref, y }: SlideProps) {
  return (
    <div className="z-10 h-screen flex justify-center items-center relative img-container">
      <div ref={ref} className="overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute max-w-md top-[calc(50% - 25px)] left-[calc(50% + 120px)]"
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible" }}
        >
          <h2 className="text-6xl font-bold mb-4">{title}</h2>
          <p className="text-lg opacity-80">{description}</p>
        </motion.div>
      </div>
    </div>
  );
}

function LastSlide({
  lang,
  dictionary,
  ref,
  y,
}: {
  lang: string;
  dictionary: any;
  ref: Ref<HTMLDivElement | null>;
  y: any;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen img-container">
      <div ref={ref} className="overflow-hidden">
        <motion.div
          className="lg:relative z-10 flex flex-col justify-center px-6 lg:px-12 xl:px-16 lg:py-20"
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible" }}
          style={{ y }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display text-hero mb-8 leading-tight text-center lg:text-left"
          >
            {dictionary.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed text-center mx-auto lg:text-left"
          >
            {dictionary.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center lg:justify-start lg:items-start"
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                const { country } = await getUserLocation();
                await submitToNotion({ email, language: lang, country });
                alert(dictionary.thank_you);
              }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <input
                autoComplete="email"
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className="bg-gray-50 rounded-lg shadow-md py-4 px-6 skeuomorphic-input"
              />
              <button type="submit" className="hero-button translate-y-1">
                <div>
                  <span>{dictionary.cta}</span>
                </div>
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Hero({ lang }: { lang: string }) {
  const t = useTranslations("hero");

  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useParallax(scrollYProgress, 100);

  return (
    <section>
      {["1", "2"].map((heroSectionNumber) => (
        <Slide
          key={heroSectionNumber}
          title={t(`${heroSectionNumber}`).title}
          description={t(`${heroSectionNumber}`).subtitle}
          ref={ref}
          y={y}
        />
      ))}
      <LastSlide dictionary={t("3")} lang={lang} ref={ref} y={y} />
      <div
        className="absolute inset-0 bottom-[-200vh] bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      />
    </section>
  );
}
