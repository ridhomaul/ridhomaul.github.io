"use client";

import { useState, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition,
}: RandomLetterSwapProps) {
  const [currentText, setCurrentText] = useState(label);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let iteration = 0;

    const animateText = () => {
      setCurrentText(() =>
        label
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return label[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration < label.length) {
        iteration += 1 / (staggerDuration * 120); 
        timeoutId = setTimeout(animateText, 30);
      } else {
        setCurrentText(label);
      }
    };

    if (isHovering) {
      iteration = 0;
      animateText();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentText(label);
    }

    return () => clearTimeout(timeoutId);
  }, [isHovering, label, staggerDuration]);

  return (
    <motion.span
      className={cn("inline-block relative whitespace-pre", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      transition={transition}
    >
      {currentText}
    </motion.span>
  );
}
