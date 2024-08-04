"use client";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const fontSize = 50;
const padding = 30;
const height = fontSize + padding;

function Counter({ value }) {
  return (
    <div
      // style={{ fontSize }}
      className="flex space-x-3 text-[20px] lg:text-[40px] overflow-hidden rounded bg-[#25324C] px-2 leading-none text-white border-solid border-2 border-[#FF8B36] h-full py-2 justify-center "
    >
      <Digit place={100000000} value={value} />
      <span className="flex items-center">,</span>
      <Digit place={10000000} value={value} />
      <Digit place={1000000} value={value} />
      <Digit place={100000} value={value} />
      <span className="flex items-center">,</span>
      <Digit place={10000} value={value} />
      <Digit place={1000} value={value} />
      <Digit place={100} value={value} />
      <span className="flex items-center">,</span>
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

function Digit({ place, value }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      style={{ height }}
      className="relative w-[1ch] tabular-nums border-r-1 border-r-[#fbcc346f] lg:px-6 px-1"
    >
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

export default function Component() {
  let [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 25));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex-1 h-full">
      <Counter value={count} />
    </div>
  );
}
