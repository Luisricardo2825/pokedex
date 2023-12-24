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
    <div className="flex flex-col items-center justify-center h-full w-[50%]">
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

      <div className="flex flex-col justify-center content-center w-full pt-5">
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

  return (
    <div className="flex flex-col content-center pt-10 bg-red-600 h-full gap-5 w-[50%] rounded-e-lg">
      <div className="flex flex-row  justify-center gap-5">
        <div className="flex flex-col justify-center gap-1 max-w-[40%] bg-white p-2 rounded-lg">
          <p className="text-red-600 text-center">Abilities</p>
          <p className="text-red text-center">
            {props.pokemon?.abilities
              .map((a) => captalize(a.ability.name.replaceAll("-", " ")))
              .join(", ")}
          </p>
        </div>
        <div className="flex flex-row justify-center gap-5 bg-white p-2 rounded-lg">
          <div>
            <p className="text-red-600 text-center">Height</p>
            <p className="text-black text-center">
              {props.pokemon?.height / 10}m
            </p>
          </div>
          <div>
            <p className="text-red-600 text-center">Weight</p>{" "}
            <p className="text-black text-center">
              {props.pokemon?.weight / 10}KG
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row  justify-center gap-5">
        <div className="flex flex-col justify-center gap-1 max-w-[40%] bg-white p-2 rounded-lg">
          <p className="text-red-600 text-center">Catch rate</p>
          <p className="text-red text-center">{catchRate}/255</p>
        </div>
        <div className="flex flex-row justify-center gap-5 bg-white p-2 rounded-lg">
          <div>
            <p className="text-red-600 text-center">Base EXP</p>
            <p className="text-black text-center">
              {props.pokemon.base_experience || "Unknow"}
            </p>
          </div>
          <div>
            <p className="text-red-600 text-center">Base Happiness</p>{" "}
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

  return (
    <div className="flex flex-row items-center justify-center h-screen p-20 ">
      <div className="flex flex-row justify-between bg-white rounded-lg h-[70vh] w-[60%]">
        <PokemonImage pokemon={pokemon} species={species}></PokemonImage>
        <div className="absolute w-52 left-0 right-0 w-100 ml-[calc(50%-120px)] mr-auto mt-[12.5%] -rotate-45 -z-1">
          <PokeBallIcon className="" />
        </div>
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
