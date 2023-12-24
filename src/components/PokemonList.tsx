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

let parentVariant = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};
export function PokemonList(props: { results: PokemonList["results"] }) {
  return (
    <div className="grid md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 md:gap-x-5 lg:gap-x-5 xl:gap-x-5 2xl:gap-x-5 gap-y-5 mb-10">
      <AnimatePresence mode="popLayout">
        {props.results.map((pokemon, index) => (
          <motion.div
            variants={item}
            key={pokemon.name}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.1,
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
