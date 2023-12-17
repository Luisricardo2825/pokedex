import resolveType from "@/constants/types";
import captalize from "@/utils/captalize";
import getPokemon from "@/utils/getPokemon";
import Image from "next/image";
import React from "react";
import { IconPokeball } from "@tabler/icons-react";

export default async function Card(props: { name: string }) {
  const pokemon = await getPokemon(props.name);

  return (
    <div className="h-[250px] w-[200px] bg-[#24242454]  rounded hover:scale-110 transition-transform">
      <div className="flex justify-center">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={100}
          height={100}
          className="z-10"
          placeholder="blur"
          blurDataURL={pokemon.sprites.front_default}
        />
        <svg width="150px" height="100px" className="absolute z-0">
          <linearGradient
            id="blue-gradient"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop stopColor="#ffffff" offset="50%" />
            <stop stopColor="#f14f4f" offset="50%" />
          </linearGradient>
          <IconPokeball
            width={150}
            height={100}
            style={{ stroke: "url(#blue-gradient)" }}
          />
        </svg>
      </div>

      <p className="text-white text-center">{captalize(pokemon.name)}</p>
      <p className="text-white text-center">{pokemon.id}</p>
      <p className="text-white text-center">{pokemon.height}</p>
      <p className="text-white text-center">{pokemon.weight}</p>
      <div className="flex justify-around">
        {pokemon.types.map((type) => (
          <p
            className={`text-white text-center rounded-lg max-w-min px-5`}
            style={{
              background: resolveType(type.type.name.toLowerCase().trim()),
            }}
            key={type.type.name}
          >
            {captalize(type.type.name)}
          </p>
        ))}
      </div>
    </div>
  );
}
