"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const BlurredStagger = ({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.012,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div ref={ref}>
      <Tag className={className}>
        <motion.span
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="inline"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              transition={{ duration: 0.3 }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    </motion.div>
  );
};
