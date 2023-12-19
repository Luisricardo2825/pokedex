"use client";
import getPokemons, { PokemonList as ListType } from "@/utils/getPokemons";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { PokemonList } from "../components/PokemonList";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Squares } from "@/components/Squares/Squares";

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

export default function Home() {
  const searchParams = useSearchParams();
  const offset: number = +(searchParams.get("offset") || 0);
  const limit: number = +(searchParams.get("limit") || PER_PAGE);
  const [page, setPage] = useState(offset / PER_PAGE + 1);
  const router = useRouter();

  const [pokemons, setPokemons] = useState<ListType>();
  const totalPages = useMemo(
    () => Math.ceil((pokemons?.count || 0) / PER_PAGE),
    [pokemons?.count]
  );

  useEffect(() => {
    getData(offset, limit).then((res) => {
      setPage(offset / PER_PAGE + 1);
      return setPokemons(res);
    });
  }, [limit, offset]);

  return (
    <main className="flex flex-col min-h-screen items-center gap-4 px-24 backdrop-blur-lg bg-cyan-600 overflow-hidden max-h-screen bg-[url('/bg.svg')]">
      {/* <Squares quantity={30} /> */}
      <div className="flex w-full rounded-ee-lg h-[70px]">
        <input
          className="w-1/6 h-10 rounded-md bg-[#2a2b2c69] hover:bg-[#2a2b2cd2] transition-colors text-base text-center"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row-reverse w-full content-center z-[9999]">
        <div className="flex justify-evenly w-1/12 items-center">
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
          <div className="flex flex-row justify-between gap-2 ">
            <input
              name="page"
              // min={1}
              value={page}
              onChange={(e) => setPage(+e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const offset = page * PER_PAGE - PER_PAGE;

                  router.push(`/?offset=${offset}&limit=${PER_PAGE}`);
                }
              }}
              // max={totalPages}
              className="w-6 h-6 bg-cyan-600 hover:bg-cyan-800 outline-none focus:bg-cyan-800 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
            />
            <div>of</div>
            <div>{totalPages}</div>
          </div>
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
      {pokemons?.results && <PokemonList results={pokemons.results} />}
    </main>
  );
}
