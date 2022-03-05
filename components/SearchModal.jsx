import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { appContext } from "../context/AppProvider";
import rest from "../utils/rest";

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SearchModal() {
  const router = useRouter();
  const [state, dispatch] = useContext(appContext);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const searchAnimeInfos = async () => {
    const [res, err] = await rest.get("/gganime/search-infos", {
      keyword: search,
    });
    if (!err) {
      setItems(res.data.data);
    }
  };

  const closeModal = () => {
    setSearch("");
    setItems([]);
    dispatch({
      type: "SET_STATE",
      payload: { search_modal: false },
    });
  };

  useEffect(() => {
    if (search) {
      searchAnimeInfos();
    } else {
      setItems([]);
    }
  }, [search]);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-screen h-screen z-50 ease-in-out duration-300 overflow-auto"
      style={{
        backgroundColor: "#000000e6",
        transform: state.search_modal ? "scale(1)" : "scale(0)",
      }}
    >
      <div className="w-auto h-full px-10 md:px-20 pt-24">
        <div className=" bg-white shadow-lg rounded-2xl overflow-hidden ease-in-out duration-300">
          <div
            className="flex bg-transparent  px-2 sm:px-5 md:px-10 border-b-2"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              style={{
                color: "#323132",
                width: "5vw",
                minWidth: 14,
                minHeight: 14,
              }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fk-search fk-w-16 fk-9x"
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
            <input
              autoFocus={state.search_modal}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search) {
                  closeModal();
                  router.push(`/animelux/search/${search}/page/1`);
                }
              }}
              type="text"
              className="focus:outline-none py-2 pr-4 pl-2 flex-1 text-black min-w-0"
              style={{ fontSize: "5vw" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {items.map((item, i) => (
            <div
              onClick={() => {
                closeModal();
                router.push(`/animelux/info/${item.category.split("/").pop()}`);
              }}
              key={i}
              className="p-2 flex text-black hover:bg-gray-300 ease-in-out duration-300 rounded-2xl my-4 mx-2 overflow-hidden cursor-pointer"
            >
              <div
                className="rounded-md shadow-lg hover:-translate-y-1 ease-in-out duration-300 bg-cover"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  minWidth: 70,
                  minHeight: 85,
                  width: 80,
                  height: 100,
                }}
              ></div>
              <div className="pl-5 flex items-center flex-1">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
