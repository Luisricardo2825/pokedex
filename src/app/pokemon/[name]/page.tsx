import { Pokemon } from "@/@types/pokemon";
import { PokemonSpecies } from "@/@types/pokemonSpecies";
import RadarComponent, { PokemonData } from "@/components/Chart/Radar";
import PokeBallIcon from "@/components/PokeBallIcon";
import resolveType from "@/constants/types";
import captalize from "@/utils/captalize";
import getPokemon from "@/utils/getPokemon";
import Image from "next/image";
import React from "react";

function PokemonImage(props: { pokemon: Pokemon; species: PokemonSpecies }) {
  const stats: PokemonData["stats"] = props.pokemon?.stats?.map((stat) => ({
    A: stat.base_stat,
    stat: captalize(stat.stat.name).replace("-", " ").replace("Special", "Sp."),
  }));
  const size = 300;
  return (
    <div className="flex flex-col items-center justify-center h-1/2 lg:h-full lg:w-[50%]">
      <div className="card w-full shadow-inner  bg-gradient-to-r from-[#f3f3f3] to-[#adababad]">
        <p className="text-gray-600 text-center text-2xl">
          {captalize(props.pokemon?.name || "Unknow")}
        </p>
        <div
          className={`ribbon relative w-fit rounded-e-lg top-1 pl-1 pr-2 bg-gradient-to-r from-[#df5858] to-[#f51111] text-[#ffffffc7]`}
        >
          #{props.pokemon.id}
        </div>
      </div>
      <Image
        src={
          props.pokemon?.sprites?.other["official-artwork"]?.front_default ||
          props.pokemon?.sprites?.front_default ||
          ""
        }
        alt={props.pokemon?.name || "unknow pokemon"}
        width={size}
        height={size}
        className="z-10 inner-element bg-red"
        priority
      />

      <div className="flex justify-around">
        {props.pokemon?.types?.map((type) => (
          <p
            className={`text-black text-center rounded-lg max-w-min px-5`}
            style={{
              background: resolveType(type.type.name.toLowerCase().trim()),
            }}
            key={type.type.name}
          >
            {captalize(type.type.name)}
          </p>
        ))}
      </div>

      <div className="hidden lg:flex flex-col  justify-center content-center w-full pt-5">
        <p className="text-black text-center font-bold">Stats</p>
        <div className="flex flex-row justify-center h-52 w-full">
          <RadarComponent
            data={{
              name: props.pokemon.name,
              stats: stats,
              color: resolveType(
                props.pokemon.types[0].type.name.toLowerCase().trim()
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PokemonDetails(props: { pokemon: Pokemon; species: PokemonSpecies }) {
  const catchRate = props.species.capture_rate;
  const color = resolveType(
    props.pokemon.types[0].type.name.toLowerCase().trim()
  );

  return (
    <div className="flex flex-col p-5 items-center justify-center w-full h-[40%] lg:h-full gap-5 lg:w-[50%] rounded-es-lg rounded-ee-lg lg:rounded-e-lg">
      <div className="flex flex-row lg:flex-col xl:flex-row justify-center gap-5">
        <div className="flex flex-col justify-center gap-1  bg-white p-2 rounded-lg">
          <p className="text-center" style={{ color }}>
            Abilities
          </p>
          <p className="text-red text-center">
            {props.pokemon?.abilities
              .map((a) => captalize(a.ability.name.replaceAll("-", " ")))
              .join(", ")}
          </p>
        </div>
        <div className="flex flex-row w-auto bg-white gap-x-2 lg:flex-col xl:flex-row justify-center gap-y-5 p-2 lg:none rounded-lg">
          <div className="lg:bg-white lg:rounded-lg xl:bg-none xl:rounded-none">
            <p className="text-center" style={{ color }}>
              Height
            </p>
            <p className="text-black text-center">
              {props.pokemon?.height / 10}m
            </p>
          </div>
          <div className="lg:bg-white lg:rounded-lg xl:bg-none xl:rounded-none">
            <p className="text-center" style={{ color }}>
              Weight
            </p>{" "}
            <p className="text-black text-center">
              {props.pokemon?.weight / 10}KG
            </p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col xl:flex-row justify-center gap-5">
        <div className="flex flex-col justify-center gap-1 bg-white p-2 rounded-lg">
          <p className="text-center" style={{ color }}>
            Catch rate
          </p>
          <p className="text-red text-center">{catchRate}/255</p>
        </div>
        <div className="flex flex-row justify-center gap-5 bg-white p-2 rounded-lg">
          <div>
            <p className="text-center" style={{ color }}>
              Base EXP
            </p>
            <p className="text-black text-center">
              {props.pokemon.base_experience || "Unknow"}
            </p>
          </div>
          <div>
            <p className="text-center" style={{ color }}>
              Base Happiness
            </p>
            <p className="text-black text-center">
              {Math.round(255 / 100 - props.species.base_happiness / 100)}%
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1"></div>
    </div>
  );
}

export default async function Page({ params }: { params: { name: string } }) {
  const pokemon = await getPokemon(params.name);
  const species = await getSpecies(params.name);
  const color = resolveType(pokemon.types[0].type.name.toLowerCase().trim());
  const color2 = pokemon.types[1]
    ? hexToCssHsl(resolveType(pokemon.types[1].type.name.toLowerCase().trim()))
    : hexToCssHsl(color);

    return (
    <div
      className="flex flex-row items-center justify-center h-screen lg:p-20"
      style={{
        background: `linear-gradient(0deg,${color2} 0%, ${color} 100%)`,
      }}
    >
      <div
        className="flex flex-col items-center lg:flex-row justify-betweerounded-lg h-[90%] w-[95%] lg:h-[70vh] lg:w-[60%] shadow-2xl"
        style={{
          background: `linear-gradient(45deg, rgba(255,255,255,1) 50%, ${color} 50%)`,
        }}
      >
        <PokemonImage pokemon={pokemon} species={species}></PokemonImage>
        <PokemonDetails pokemon={pokemon} species={species}></PokemonDetails>
      </div>
    </div>
  );
}

async function getSpecies(idOrName: number | string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`
  );
  const data: PokemonSpecies = await res.json();

  return data;
}

// usado para converter a cor https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf
function hexToCssHsl(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "";
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  let cssString = "";
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (h) h /= 6;
  }

  h = Math.round((h || 1) * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  cssString = h * 1.25 + "," + s / 4 + "%," + l * 1.25 + "%";
  cssString = "hsl(" + cssString + ")";

  return cssString;
}
