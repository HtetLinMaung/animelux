import Link from "next/link";
import { useState, useContext } from "react";
import { appContext } from "../context/AppProvider";

export default function Navbar() {
  const [_, dispatch] = useContext(appContext);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav
      className="sticky top-0 z-40 w-full shadow-lg"
      style={{ backgroundColor: "#323132" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {openMenu ? (
              <svg
                onClick={() => setOpenMenu(!openMenu)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.41 12L17.71 7.71C17.8983 7.5217 18.0041 7.2663 18.0041 7C18.0041 6.7337 17.8983 6.47831 17.71 6.29C17.5217 6.1017 17.2663 5.99591 17 5.99591C16.7337 5.99591 16.4783 6.1017 16.29 6.29L12 10.59L7.71 6.29C7.5217 6.1017 7.2663 5.99591 7 5.99591C6.7337 5.99591 6.4783 6.1017 6.29 6.29C6.1017 6.47831 5.99591 6.7337 5.99591 7C5.99591 7.2663 6.1017 7.5217 6.29 7.71L10.59 12L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L12 13.41L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29L13.41 12Z"
                  fill="white"
                />
              </svg>
            ) : (
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
            )}

            <div className="font-bold text-xl hidden sm:hidden lg:block">
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
                dispatch({
                  type: "SET_STATE",
                  payload: { search_modal: true },
                });
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fk-search fk-w-16 fk-9x w-4 mr-2 cursor-pointer inline"
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
