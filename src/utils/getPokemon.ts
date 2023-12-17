import { Pokemon } from "@/@types/pokemon";

export default async function getPokemon(
  idOrName: number | string,
  pokemons = new Map()
) {
  let pokemon = findPokemon(idOrName, pokemons);
  if (pokemon) {
    console.log("Found");
    return pokemon;
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  const data: Pokemon = await res.json();
  pokemon = data;

  return pokemon;
}

function findPokemon(
  param: string | number,
  pokemons: Map<string, any>
): Pokemon | null {
  if (pokemons.has(String(param))) {
    return pokemons.get(String(param));
  }
  const regex = new RegExp(`([\\w\\W]*):${param}$`, "gm");

  for (const key of Array.from(pokemons.keys())) {
    if (key.match(regex)) {
      const pokemon = pokemons.get(key);
      return pokemon;
    }
  }
  return null;
}
