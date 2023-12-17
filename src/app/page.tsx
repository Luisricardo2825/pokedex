import Card from "@/components/Card";
import getPokemons from "@/utils/getPokemons";
import Link from "next/link";

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
  const page = Number(offset) / PER_PAGE + 1;
  const totalPages = Math.ceil(pokemons.count / PER_PAGE);

  return (
    <main className="flex flex-col min-h-screen items-center gap-4 px-24 pt-14 backdrop-blur-lg bg-cyan-600">
      <div className="flex  justify-around bg-[#2a2b2cd2] absolute top-0 left-0 w-[500px] rounded-ee-lg h-[70px]">
        <p className="font-bold text-lg">
          Boxes: {totalPages}
          Box: {page}
        </p>
        <input
          className="w-1/2 h-10 rounded-md bg-[#2a2b2c69] hover:bg-[#2a2b2cd2] transition-colors"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row-reverse w-full ">
        <div className="flex justify-between w-1/12">
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
              className="bg-[#00000065] rounded-md p-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#000000a6]"
              disabled={offset ? +offset == 0 : true}
            >
              Previous
            </button>
          </Link>

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
              className="bg-[#00000065] rounded-md p-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#000000a6]"
              disabled={totalPages == page}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-8 md:grid-cols-6 gap-4">
        {pokemons.results.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </main>
  );
}
