import rest from "../../../../utils/rest";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Info() {
  const router = useRouter();
  const [item, setItem] = useState({ name: "", img: "" });
  const [related_episodes, setRelatedEpisodes] = useState([]);

  const fetchInfo = async () => {
    const [res, err] = await rest.get("/gganime/info", {
      c: `/category/${router.query.c}`,
    });

    if (!err) {
      setItem(res.data.data);
      fetchReleatedEpisodes(res.data.data.eps);
    }
  };

  const fetchReleatedEpisodes = async (eps) => {
    const [res, err] = await rest.post("/gganime/related-episodes", {
      c: `/category/${router.query.c}`,
      eps,
    });

    if (!err) {
      setRelatedEpisodes(res.data.data);
    }
  };

  useEffect(() => {
    if (router.query.c) {
      fetchInfo();
    }
  }, [router.query.c]);

  const DescItem = ({ k, v }) => {
    const key = k.toLowerCase();
    if (key == "genre") {
      return v.map((text, i) => (
        <Link key={i} href={`/animelux/genre/${text.toLowerCase()}/page/1`}>
          <a className="mr-2">{text}</a>
        </Link>
      ));
    } else if (key == "type") {
      return (
        <Link
          href={`/animelux/sub-category/${v
            .toLowerCase()
            .replaceAll(" ", "-")}/page/1`}
        >
          <a className="mr-2">{v}</a>
        </Link>
      );
    } else if (key == "status" && v.toLowerCase() != "upcoming") {
      return (
        <Link href={`/animelux/status/${v.toLowerCase()}/page/1`}>
          <a className="mr-2">{v}</a>
        </Link>
      );
    }
    return v;
  };

  return (
    <div className="container mx-auto px-4 pt-5 mb-10">
      <Head>
        <title>{item.name}</title>
      </Head>
      <h1 className="text-4xl my-7">{item.name}</h1>

      <div className="flex flex-wrap justify-center">
        <div
          className="rounded-2xl shadow-lg ease-in-out duration-300 bg-cover mb-10"
          style={{
            backgroundImage: `url('${item.img}')`,
            width: 164 * 2,
            height: 229 * 2,
          }}
        ></div>
        <div className="md:pl-5 flex-auto sm:flex-auto md:flex-1">
          {Object.entries(item).map(([key, value]) =>
            !["eps", "img", "name"].includes(key) ? (
              <div key={key}>
                <h3 className=" font-bold mb-3">{key.toUpperCase()}</h3>
                <p className="mb-5 text-sm">
                  <DescItem k={key} v={value} />
                </p>
              </div>
            ) : (
              ""
            )
          )}
          <h3 className=" font-bold mb-3">Episodes</h3>
          <div
            className="flex flex-wrap my-3 overflow-auto p-2"
            style={{ maxHeight: 220 }}
          >
            {related_episodes.map((episode, i) => (
              <Link
                href={`/animelux/watch/${episode.link.split("/").pop()}`}
                passHref
                key={i}
              >
                <div
                  className="inline-flex p-2 px-4 text-sm rounded-xl mr-2 mb-2 cursor-pointer"
                  style={{ backgroundColor: "#1c1b1c" }}
                >
                  {episode.name.replace("EP", "Episode")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { c } = context.query;

//   let item = null;
//   const [res, err] = await rest.get("/gganime/info", {
//     c: `/category/${c}`,
//   });

//   if (!err) {
//     item = res.data.data;
//   }

//   return {
//     props: {
//       item,
//     },
//   };
// }
