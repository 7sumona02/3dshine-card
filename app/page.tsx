'use client'

import newStyled from "@emotion/styled";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { GithubIcon } from "./Github";

const RotationWrapper = newStyled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
`;

const Page = () => {
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
);
const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
);

// handle mouse move on document
useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // animate mouse x and y
        animate(mouseX, e.clientX);
        animate(mouseY, e.clientY);
    };
    if (typeof window === 'undefined') return;
    // recalculate grid on resize
    window.addEventListener('mousemove', handleMouseMove);
    // cleanup
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
}, []);

const cardRef = useRef<HTMLDivElement>(null);

const dampen = 40;
const rotateX = useTransform<number, number>(mouseY, (newMouseY) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const newRotateX = newMouseY - rect.top - rect.height / 2;
    return -newRotateX / dampen;
});
const rotateY = useTransform(mouseX, (newMouseX) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const newRotateY = newMouseX - rect.left - rect.width / 2;
    return newRotateY / dampen;
});

const diagonalMovement = useTransform<number, number>(
  [rotateX, rotateY],
  ([newRotateX, newRotateY]) => {
      const position: number = newRotateX + newRotateY;
      return position;
  }
);
const sheenPosition = useTransform(
  diagonalMovement,
  [-5, 5],
  [-100, 200]
);

const sheenOpacity = useTransform(
  sheenPosition,
  [-100, 0, 100, 200],
  [0, 0.1, 0.1, 0]
);

const sheenGradient = useMotionTemplate`linear-gradient(
  55deg,
  transparent,
  rgba(255 255 255 / ${sheenOpacity}) ${sheenPosition}%,
  transparent)`;
  return (
    <div className='relative w-screen h-screen flex items-center justify-center overflow-hidden perspective-[1000px]'>
      <RotationWrapper style={{ rotateX, rotateY }}>
        <div className="relative h-[50vw] w-[50vw] bg-black bg-[radial-gradient(#f3f3f3,transparent_2px)] [background-size:50px_50px]"></div>       
          <motion.div ref={cardRef} style={{ backgroundImage: sheenGradient }} className="absolute top-1/4 z-10 translate-z-40">
            <motion.div className='h-96 w-72 flex flex-col items-center justify-center gap-4 border border-gray-200/50 bg-white/20 backdrop-blur-lg rounded-xl p-10 font-mono text-center'>
                <div>Follow me on Github</div>
                <Link href='https://github.com/7sumona02' className='bg-neutral-900 p-3 rounded-full'><GithubIcon /></Link>
            </motion.div>
          </motion.div>
      </RotationWrapper>
    </div>
  )
}

export default Page