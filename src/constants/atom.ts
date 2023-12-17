import { Pokemon } from "@/@types/pokemon";
import { atom } from "jotai";

const inital = new Map<string, Pokemon>();
export const pokemonsAtom = atom(inital);
