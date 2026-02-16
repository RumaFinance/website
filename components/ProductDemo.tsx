"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";

const STEPS = ["download", "setup", "enjoy"];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ProductDemo() {
  const t = useTranslations("demo");

  return (
    <section>
      {STEPS.map((feature) => (
        <ParallaxSlide
          key={feature}
          image={`/screenshots/${feature}.webp`}
          title={t("features")[feature].title}
          description={t("features")[feature].description}
        />
      ))}
    </section>
  );
}

interface ParallaxSlideProps {
  image: string;
  title: string;
  description: string;
}

function ParallaxSlide({ image, title, description }: ParallaxSlideProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useParallax(scrollYProgress, 300);

  return (
    <div className="h-screen flex justify-center items-center relative img-container">
      <div ref={ref} className="overflow-hidden">
        <Image src={image} alt={title} width={200} height={600} />

        <motion.div
          style={{ y }}
          className="absolute max-w-md top-[calc(50% - 25px)] left-[calc(50% + 120px)]"
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible" }}
        >
          <h2 className="text-4xl font-semibold mb-4">{title}</h2>
          <p className="text-lg opacity-80">{description}</p>
        </motion.div>
      </div>
    </div>
  );
}
