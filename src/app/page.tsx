import { Paginator } from "@/components/Paginator";
import { PokemonList } from "@/components/PokemonList";
import getPokemons, {
  PokemonList as ListType,
  Result,
} from "@/utils/getPokemons";
import { buildQuery } from "@/utils/query";
import { redirect } from "next/navigation";

const PER_PAGE = 24;

async function getCount() {
  const count = (await getPokemons(0, 1)).count;
  return count;
}
async function getData(offset?: number, limit?: number, search?: string) {
  try {
    const limit = await getCount();
    const res = await getPokemons(0, limit, search);
    return res;
  } catch (error) {
    throw new Error("Failed to fetch data" + error);
  }
}

function searchPokemons(pokemons: ListType | undefined, search?: string) {
  const list = pokemons?.results.filter((pokemon) =>
    search ? pokemon.name.includes(search) : true
  );
  const total = Math.ceil((list?.length || 0) / PER_PAGE) || 0;
  return { list, total };
}

function defaultList(pokemons: ListType | undefined, search?: string) {
  const list = pokemons?.results;
  const total = Math.ceil((pokemons?.count || 0) / PER_PAGE);

  return { list, total };
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    offset?: string;
    limit?: string;
    search?: string;
  };
}) {
  const offset: number = +(searchParams?.offset || 0);
  const limit: number = +(searchParams?.limit || PER_PAGE);
  let search: string | undefined = searchParams?.search;

  let pokemons: ListType | undefined = await getData(offset, limit);

  const items = search
    ? searchPokemons(pokemons, search)
    : defaultList(pokemons);

  const { list, total } = items;

  async function handleSearch(formData: FormData) {
    "use server";
    const search = formData.get("search") as string;
    const query = buildQuery({
      offset: 0,
      limit,
      search,
    });
    redirect(`/?${query}`);
  }
  return (
    <main className="flex flex-col items-center backdrop-blur-lg min-h-screen overflow-hidden">
      {/* <Squares quantity={30} /> */}
      <form
        action={handleSearch}
        className="flex flex-row items-center justify-center w-full rounded-ee-lg h-[70px]"
      >
        <input
          name="search"
          className="w-1/2 h-10 rounded-md bg-[#2a2b2c69] hover:bg-[#2a2b2cd2] transition-colors text-base text-center"
          type="text"
          placeholder="Search"
        />
      </form>
      <Paginator
        offset={offset}
        limit={limit}
        totalPages={total}
        search={search}
      />
      {list && Array.isArray(list) ? (
        <PokemonList results={list.slice(offset, offset + PER_PAGE)} />
      ) : (
        <PokemonList results={[list as unknown as Result]} />
      )}
    </main>
  );
}
