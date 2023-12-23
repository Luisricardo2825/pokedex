import { IconPokeball } from "@tabler/icons-react";
import React from "react";

export default function PokeBallIcon(props: { className?: string }) {
  return (
    <svg
      width="150px"
      height="100px"
      className={`absolute z-0 ${props.className}`}
    >
      <linearGradient id="poke-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop stopColor="#ffffff" offset="50%" />
        <stop stopColor="#f14f4f" offset="50%" />
      </linearGradient>
      <IconPokeball
        width={150}
        height={100}
        style={{ stroke: "url(#poke-gradient)" }}
      />
    </svg>
  );
}
