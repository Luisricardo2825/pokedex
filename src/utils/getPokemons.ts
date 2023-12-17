export default function getPokemons(offset: number, limit: number) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data as PokemonList;
    });
}

interface PokemonList {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
