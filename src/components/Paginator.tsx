"use client";
import { buildQuery } from "@/utils/query";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PER_PAGE = 24;

export const Paginator = ({
  offset,
  limit,
  totalPages,
  search,
}: {
  offset: number;
  limit: number;
  totalPages: number;
  search?: string;
}) => {
  const initalPage = React.useMemo(() => offset / limit + 1, [offset, limit]);
  const [page, setPage] = React.useState(initalPage);
  const router = useRouter();

  React.useEffect(() => {
    setPage(offset / limit + 1);

    return () => {
      setPage(1);
    };
  }, [offset, limit]);

  return (
    <div className="flex flex-row items-center py-3">
      <div className="flex justify-center lg:w-1/12 items-center gap-2">
        <Link
          href={{
            pathname: "/",
            query: {
              offset: offset && +offset > 0 ? +offset - PER_PAGE : 0,
              limit: limit || PER_PAGE,
              search,
            },
          }}
          passHref
        >
          <button
            className="h-6 bg-[#00000065] rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#000000a6]"
            disabled={offset ? +offset == 0 : true}
          >
            <IconChevronLeft />
          </button>
        </Link>
        <input
          name="page"
          value={page}
          onChange={(e) => setPage(+e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const offset = page * PER_PAGE - PER_PAGE;
              const query = buildQuery({
                offset,
                limit: PER_PAGE,
                search,
              });
              router.push(`/?${query}`);
            }
          }}
          // max={totalPages}
          className="w-6 h-6 bg-cyan-600 hover:bg-cyan-800 outline-none focus:bg-cyan-800 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
        />
        <div className="h-6">of</div>
        <div className="h-6">{totalPages}</div>
        <Link
          href={{
            pathname: "/",
            query: {
              offset: offset ? +offset + PER_PAGE : PER_PAGE,
              limit: limit || PER_PAGE,
              search,
            },
          }}
          passHref
        >
          <button
            className="h-6 bg-[#00000065] rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#000000a6]"
            disabled={totalPages == page}
          >
            <IconChevronRight />
          </button>
        </Link>
      </div>
    </div>
  );
};
