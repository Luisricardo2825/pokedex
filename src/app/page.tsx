import getPokemons from "@/utils/getPokemons";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { PokemonList } from "../components/PokemonList";

const PER_PAGE = 24;
const OFFSET = 0;
async function getData(offset?: number, limit?: number) {
  try {
    const res = await getPokemons(offset || OFFSET, limit || PER_PAGE);
    return res;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    offset: number | undefined;
    limit: number | undefined;
  };
}) {
  const { offset, limit } = searchParams;

  const pokemons = await getData(offset, limit);
  const page = Number(offset || 0) / PER_PAGE + 1;
  const totalPages = Math.ceil(pokemons.count / PER_PAGE);

  return (
    <main className="flex flex-col min-h-screen items-center gap-4 px-24 pt-14 backdrop-blur-lg bg-cyan-600 overflow-hidden max-h-screen">
      <div className="flex  justify-around bg-[#2a2b2cd2] absolute top-0 left-0 w-[500px] rounded-ee-lg h-[70px]">
        <input
          className="w-1/2 h-10 rounded-md bg-[#2a2b2c69] hover:bg-[#2a2b2cd2] transition-colors"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row-reverse w-full content-center z-[9999]">
        <div className="flex justify-evenly w-1/12 content-center">
          <Link
            href={{
              pathname: "/",
              query: {
                offset: offset && +offset > 0 ? +offset - PER_PAGE : 0,
                limit: limit || PER_PAGE,
              },
            }}
            passHref
          >
            <button
              className="bg-[#00000065] rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#000000a6]"
              disabled={offset ? +offset == 0 : true}
            >
              <IconChevronLeft />
            </button>
          </Link>
          {page}
          <span>of</span>
          {totalPages}
          <Link
            href={{
              pathname: "/",
              query: {
                offset: offset ? +offset + PER_PAGE : PER_PAGE,
                limit: limit || PER_PAGE,
              },
            }}
            passHref
          >
            <button
              className="bg-[#00000065] rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#000000a6]"
              disabled={totalPages == page}
            >
              <IconChevronRight />
            </button>
          </Link>
        </div>
      </div>
      <PokemonList results={pokemons.results}></PokemonList>
    </main>
  );
}
