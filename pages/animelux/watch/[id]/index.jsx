import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import rest from "../../../../utils/rest";
import Link from "next/link";
import Head from "next/head";

export default function Watch() {
  const router = useRouter();
  const [related_episodes, setRelatedEpisodes] = useState([]);
  const [stream, setStream] = useState("");
  const [title, setTitle] = useState("");
  const [anime_name, setAnimeName] = useState("");
  const [category, setCategory] = useState("");
  const [current_episode, setCurrentEpisode] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);

  const fetchWatch = async () => {
    console.log("fetching stream");
    const [res, err] = await rest.get(
      `/gganime/episode-detail?link=${router.query.id}`
    );

    if (!err) {
      setStream(res.data.data.stream);
      setTitle(res.data.data.title);
      setAnimeName(res.data.data.anime_name);
      setCategory(res.data.data.category);
      setCurrentEpisode(res.data.data.current_episode);
      fetchReleatedEpisodes(res.data.data.eps);
    }
  };

  const fetchReleatedEpisodes = async (eps) => {
    const [res, err] = await rest.post("/gganime/related-episodes", {
      c: `https://ww2.gogoanimes.org/watch/${router.query.id}`,
      eps,
    });

    if (!err) {
      setRelatedEpisodes(res.data.data);
    }
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.onresize = () => {
      setScreenWidth(window.innerWidth);
    };
  }, []);

  useEffect(() => {
    if (router.query.id) {
      fetchWatch();
    }
  }, [router.query.id]);

  return (
    <div className="container mx-auto px-4 pt-10">
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="text-4xl my-7 mt-3">{title}</h1>
      <p className="my-5 text-sm">
        <Link href={`/animelux/info/${category.split("/").pop()}`} passHref>
          <a>{anime_name}</a>
        </Link>
      </p>
      <div className="flex lg:flex-nowrap flex-wrap mb-10">
        <iframe
          height={screenWidth > 624 ? "800" : "400"}
          allowFullScreen
          className="lg:w-5/6 sm:w-full w-full rounded-xl"
          src={stream}
        ></iframe>
        <ul
          style={{ height: "60vh" }}
          className="shadow-lg rounded-xl ml-2 lg:w-1/6 w-full sm:w-full sm:static lg:sticky top-32 overflow-auto p-2 px-4 bg-black mb-5"
        >
          {related_episodes.map((item, i) => (
            <Link
              key={i}
              href={`/animelux/watch/${item.link.split("/").pop()}`}
              passHref
            >
              <li
                style={{
                  fontSize: 12,
                  backgroundColor:
                    current_episode == item.episode ? "#3CBC77" : "#323132",
                }}
                className="my-3 p-2 rounded-md ease-in-out duration-300 cursor-pointer"
              >
                <a>{item.name.replace("EP", "Episode")}</a>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   let related_episodes = [];
//   let stream = "";
//   let title = "";
//   console.log("fetching stream");
//   const [res, err] = await rest.get(
//     `/gganime/episode-detail?link=https://ww2.gogoanimes.org/watch/${id}`
//   );

//   if (!err) {
//     related_episodes = res.data.data.related_episodes;
//     stream = res.data.data.stream;
//     title = res.data.data.title;
//   }

//   return {
//     props: {
//       related_episodes,
//       stream,
//       title,
//     },
//   };
// }
