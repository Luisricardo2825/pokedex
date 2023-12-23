import { Pokemon } from "@/@types/pokemon";

export default async function getPokemon(idOrName: number | string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  const data: Pokemon = await res.json();

  return data;
}
