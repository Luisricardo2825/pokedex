export default function getPokemons(
  offset: number,
  limit: number,
  pokemon?: string
) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${
      pokemon ? pokemon : ""
    }?offset=${offset}&limit=${limit}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data as PokemonList;
    });
}

export interface PokemonList {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
