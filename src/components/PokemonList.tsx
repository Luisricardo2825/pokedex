"use client";
import { AnimatePresence, motion } from "framer-motion";
import { PokemonList } from "@/utils/getPokemons";
import React from "react";
import Card from "./Card";

const item = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
};
export function PokemonList(props: { results: PokemonList["results"] }) {
  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-6 gap-8 max-h-screen">
      <AnimatePresence mode="popLayout">
        {props.results.map((pokemon, index) => (
          <motion.div
            variants={item}
            key={pokemon.name}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.5,
              delay: 0.05 * index,
              type: "just",
            }}
          >
            <Card key={pokemon.name} name={pokemon.name} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
