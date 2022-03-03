import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav
      className="sticky top-0 z-40 w-full shadow-lg"
      style={{ backgroundColor: "#323132" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <svg
              onClick={() => setOpenMenu(!openMenu)}
              className="lg:hidden inline"
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13H17M1 1H17H1ZM1 7H17H1Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="font-bold text-xl mr-2 hidden sm:hidden lg:block">
              <Link href="/animelux/latest/page/1" passHref>
                Animelux
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-bold text-2xl mr-2 sm:block lg:hidden">
              <Link href="/animelux/latest/page/1" passHref>
                Animelux
              </Link>
            </div>
            <div className="mr-10 text-md hidden sm:hidden lg:block">
              <Link href="/animelux/latest/page/1" passHref>
                Latest
              </Link>
            </div>
            <div className="mr-10 text-md hidden sm:hidden lg:block">
              <Link href="/animelux/new-season/page/1" passHref>
                New Season
              </Link>
            </div>
            <div className="mr-10 text-md hidden sm:hidden lg:block">
              <Link href="/animelux/popular/page/1" passHref>
                Popular
              </Link>
            </div>
            <div className="mr-10 text-md hidden sm:hidden lg:block">
              <Link href="/animelux/movie/page/1" passHref>
                Movie
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <svg
              onClick={() => {
                setOpenSearch(!openSearch);
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fk-search fk-w-16 fk-9x w-4 mr-2 cursor-pointer lg:hidden inline"
            >
              <g className="fk-group">
                <path
                  fill="currentColor"
                  d="M208 80a128 128 0 1 1-90.51 37.49A127.15 127.15 0 0 1 208 80m0-80C93.12 0 0 93.12 0 208s93.12 208 208 208 208-93.12 208-208S322.88 0 208 0z"
                  className="fk-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M504.9 476.7L476.6 505a23.9 23.9 0 0 1-33.9 0L343 405.3a24 24 0 0 1-7-17V372l36-36h16.3a24 24 0 0 1 17 7l99.7 99.7a24.11 24.11 0 0 1-.1 34z"
                  className="fk-primary"
                ></path>
              </g>
            </svg>
            <div className="bg-white overflow-hidden rounded-xl shadow-lg hidden sm:hidden lg:flex">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search) {
                    router.push(`/animelux/search/${search}/page/1`);
                  }
                }}
                className="bg-transparent flex-1 focus:outline-none text-black text-sm px-4 py-1"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                style={{ color: "#323132" }}
                onClick={() => {
                  if (search) {
                    router.push(`/animelux/search/${search}/page/1`);
                    setSearch("");
                  }
                }}
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fk-search fk-w-16 fk-9x w-4 mr-2 cursor-pointer"
              >
                <g className="fk-group">
                  <path
                    fill="currentColor"
                    d="M208 80a128 128 0 1 1-90.51 37.49A127.15 127.15 0 0 1 208 80m0-80C93.12 0 0 93.12 0 208s93.12 208 208 208 208-93.12 208-208S322.88 0 208 0z"
                    className="fk-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M504.9 476.7L476.6 505a23.9 23.9 0 0 1-33.9 0L343 405.3a24 24 0 0 1-7-17V372l36-36h16.3a24 24 0 0 1 17 7l99.7 99.7a24.11 24.11 0 0 1-.1 34z"
                    className="fk-primary"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div
          className="bg-white overflow-hidden rounded-xl shadow-lg lg:flex ease-in-out duration-300"
          style={{
            maxHeight: openSearch ? 35 : 0,
            opacity: openSearch ? 1 : 0,
            margin: openSearch ? "1rem 0" : 0,
          }}
        >
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter" && search) {
                router.push(`/animelux/search/${search}/page/1`);
                setSearch("");
              }
            }}
            className="bg-transparent flex-1 focus:outline-none text-black text-sm px-4 py-1"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul
          className="ease-in-out duration-300 overflow-hidden"
          style={{ opacity: openMenu ? 1 : 0, maxHeight: openMenu ? 320 : 0 }}
        >
          <li className="mr-10 text-md mb-2">
            <Link href="/animelux/latest/page/1" passHref>
              Latest
            </Link>
          </li>
          <li className="mr-10 text-md mb-2">
            <Link href="/animelux/new-season/page/1" passHref>
              New Season
            </Link>
          </li>
          <li className="mr-10 text-md mb-2">
            <Link href="/animelux/popular/page/1" passHref>
              Popular
            </Link>
          </li>
          <li className="mr-10 text-md mb-2">
            <Link href="/animelux/movie/page/1" passHref>
              Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
