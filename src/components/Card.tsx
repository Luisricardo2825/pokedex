"use client";
import resolveType from "@/constants/types";
import captalize from "@/utils/captalize";
import getPokemon from "@/utils/getPokemon";
import Image from "next/image";
import React, { useState } from "react";
import { Pokemon } from "@/@types/pokemon";
import { useAtom } from "jotai";
import { pokemonsAtom } from "@/constants/atom";
import PokeBallIcon from "./PokeBallIcon";
import Tilt from "react-parallax-tilt";
import Link from "next/link";

export default function Card(props: { name: string }) {
  const [pokemons, setPokemons] = useAtom(pokemonsAtom);
  const [pokemon, setPokemon] = useState<Partial<Pokemon>>();
  React.useEffect(() => {
    const pokemon = pokemons.get(props.name);
    if (pokemon) {
      setPokemon(pokemon);
      return;
    }
    getPokemon(props.name).then((pokemon) => {
      setPokemon(pokemon);
      setPokemons((prev) => {
        prev.set(pokemon.name, {
          sprites: pokemon.sprites,
          types: pokemon.types,
          name: pokemon.name,
          id: pokemon.id,
          height: pokemon.height,
          weight: pokemon.weight,
        });
        return prev;
      });
    });
  }, [pokemons, props.name, setPokemons]);
  if (!pokemon)
    return (
      <div className="flex flex-col items-center justify-center h-20 md:h-[200px] md:w-[200px] bg-[#24242454] rounded hover:scale-110 transition-transform">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <Tilt
      className="card w-[80vw] md:h-52 md:max-h-52 sm:w-32 xl:w-44 glassmorphic transition-transform p-5 parallax-effect-img hover:z-50"
      tiltMaxAngleX={40}
      tiltMaxAngleY={40}
      perspective={800}
      transitionSpeed={1500}
      scale={1.1}
      glareReverse
      glareEnable={true}
      glareMaxOpacity={0.8}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="20px"
    >
      <Link passHref href={`/pokemon/${pokemon.name}`}>
        <div className="flex flex-row h-20 md:h-auto md:flex md:flex-col justify-between items-center">
          <div
            className={`ribbon relative w-fit rounded-e-lg top-2 pl-1 pr-2 bg-gradient-to-r from-[#df585880] to-[#f51111ad] text-[#ffffffc7]`}
          >
            #{pokemon.id}
          </div>
          <PokeBallIcon className="absolute -left-[5px] -top-[5px] md:top-[50%] md:left-[50%] md:transform md:-translate-x-1/2 md:-translate-y-[70%]" />
          <div className="flex flex-col justify-center p-1">
            <Image
              src={
                pokemon?.sprites?.other["official-artwork"]?.front_default ||
                pokemon?.sprites?.front_default ||
                ""
              }
              alt={pokemon?.name || "unknow pokemon"}
              height={90}
              width={90}
              className="z-10 h-[90px]"
              priority
            />
            <p className="text-white text-center">
              {captalize(pokemon?.name || "Unknow").replaceAll("-", " ")}
            </p>
          </div>

          <div className="flex flex-col gap-1 bg-red">
            {pokemon?.types?.map((type) => (
              <div
                className={`text-white text-center rounded-lg px-3 py-[2px]`}
                style={{
                  background: resolveType(type.type.name.toLowerCase().trim()),
                }}
                key={type.type.name}
              >
                {captalize(type.type.name)}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
