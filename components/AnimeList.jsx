import Head from "next/head";
import Link from "next/link";

export default function AnimeList({ title, module, items, pages, p }) {
  return (
    <div className="container mx-auto px-4 pt-10 mb-28">
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="text-4xl my-7 text-center sm:text-left">{title}</h1>

      <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-center flex-col"
            style={{ width: 164 * 1.5 }}
          >
            <Link
              href={`/animelux/info/${item.link.split("/").pop()}`}
              passHref
            >
              <div
                className="cursor-pointer rounded-2xl shadow-lg hover:-translate-y-1 ease-in-out duration-300 bg-cover"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  width: 164 * 1.5,
                  height: 229 * 1.5,
                }}
              ></div>
            </Link>
            <Link
              href={`/animelux/info/${item.link.split("/").pop()}`}
              passHref
            >
              <a
                className="my-3 text-center font-bold"
                style={{ fontSize: 13 }}
              >
                {item.name}
              </a>
            </Link>
            <p className=" text-center font-bold" style={{ fontSize: 12 }}>
              {item.release}
            </p>
          </div>
        ))}
      </div>

      <div
        className="flex justify-center fixed bottom-5 w-full right-0"
        style={{ color: "#323132" }}
      >
        <ul className="my-7 inline-flex bg-white rounded-2xl p-2 px-3 shadow-lg">
          {pages.map((page, i) => (
            <Link key={i} href={`/animelux/${module}/page/${page}`} passHref>
              <li
                className="cursor-pointer rounded-lg px-2 mx-1 py-1 text-sm flex items-center"
                style={{
                  backgroundColor: page == p ? "#323132" : "white",
                  color: page == p ? "white" : "#323132",
                }}
              >
                {page}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
