import Link from "next/link";
import rest from "../../../../../../utils/rest";
import Head from "next/head";

// uppercase first char
function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Popular({ items, pages, p, genre }) {
  return (
    <div className="container mx-auto px-4 pt-10">
      <Head>
        <title>Genre {ucfirst(genre)}</title>
      </Head>
      <h1 className="text-4xl my-7 text-center sm:text-left">
        Genre {ucfirst(genre)}
      </h1>

      <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-center flex-col"
            style={{ width: 164 * 1.5 }}
          >
            {/* <Image
              className="cursor-pointer rounded-2xl shadow-lg  overflow-visible"
              src={item.img}
              alt={item.name}
              width={164}
              height={229}
            /> */}
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
            <Link
              key={i}
              href={`/animelux/genre/${genre}/page/${page}`}
              passHref
            >
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

export async function getServerSideProps(context) {
  rest;
  const { p, genre } = context.query;

  let items = [];
  let pages = [1, 2, 3, 4, 5];
  const [res, err] = await rest.get(`/gganime/genre/${genre}`, {
    page: p,
  });

  if (p >= 5) {
    const n = parseInt(p);
    pages = [n - 2, n - 1, n, n + 1, n + 2];
  }

  if (!err) {
    items = res.data.data;
  }

  return {
    props: {
      items,
      pages,
      p,
      genre,
    },
  };
}
