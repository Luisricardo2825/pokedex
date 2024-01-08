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
import { ActivityIndicator } from "@/components/ActivityIndicator";

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
          <ActivityIndicator></ActivityIndicator>
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
              unoptimized
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
