import { Pokemon } from "@/@types/pokemon";
import getPokemon from "@/utils/getPokemon";
import React from "react";

const pokemons = new Map<string, any>();
export default function usePokemon(idOrName: number | string) {
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    getPokemon(idOrName)
      .then((data) => {
        setPokemon(data);
        pokemons.set(data.name, data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [idOrName]);

  return { pokemon, loading, error };
}
