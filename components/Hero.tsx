"use client";

import { useTranslations } from "@/context/translations/TranslationsContext";
import { getUserLocation, submitToNotion } from "@/lib/notion";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { Ref, useRef } from "react";
import Image from "next/image";

interface SlideProps {
  title: string;
  description: string;
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Slide({ title, description }: SlideProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useParallax(scrollYProgress, 100);

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

function LastSlide({ lang, dictionary }: { lang: string; dictionary: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Define positions and sizes for each feature image
  const featureAnimations = [
    { x: "-40vw", y: "-30vh", scale: 0.8, rotate: -15 }, // Top left
    { x: "35vw", y: "-35vh", scale: 1.2, rotate: 10 }, // Top right
    { x: "-45vw", y: "25vh", scale: 1.0, rotate: 5 }, // Bottom left
    { x: "40vw", y: "30vh", scale: 0.9, rotate: -10 }, // Bottom right
    { x: "0vw", y: "-40vh", scale: 0.7, rotate: 0 }, // Top center
  ];

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Animated feature images */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5].map((num, index) => (
          <motion.div
            key={num}
            className="absolute top-1/2 left-1/2 z-10"
            initial={{
              x: "-50%",
              y: "-50%",
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            animate={
              isInView
                ? {
                    x: `calc(${featureAnimations[index].x} - 50%)`,
                    y: `calc(${featureAnimations[index].y} - 50%)`,
                    scale: featureAnimations[index].scale,
                    rotate: featureAnimations[index].rotate,
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            <Image
              src={`/features/feature-${num}.png`}
              alt={`Feature ${num}`}
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-12
xl:px-16"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-display text-hero mb-8 leading-tight text-center"
        >
          {dictionary.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed text-center max-w-2xl"
        >
          {dictionary.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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
      </div>
    </div>
  );
}

export default function Hero({ lang }: { lang: string }) {
  const t = useTranslations("hero");

  return (
    <section>
      {["1", "2"].map((heroSectionNumber) => (
        <Slide
          key={heroSectionNumber}
          title={t(`${heroSectionNumber}`).title}
          description={t(`${heroSectionNumber}`).subtitle}
        />
      ))}
      <LastSlide dictionary={t("3")} lang={lang} />
      <div
        className="absolute inset-0 bottom-[-200vh] bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      />
    </section>
  );
}
