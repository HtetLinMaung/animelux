import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import rest from "../../../../utils/rest";

export default function Watch() {
  const router = useRouter();
  const [related_episodes, setRelatedEpisodes] = useState([]);
  const [stream, setStream] = useState("");
  const [title, setTitle] = useState("");

  const fetchWatch = async () => {
    console.log("fetching stream");
    const [res, err] = await rest.get(
      `/gganime/episode-detail?link=https://ww2.gogoanimes.org/watch/${router.query.id}`
    );

    if (!err) {
      setRelatedEpisodes(res.data.data.related_episodes);
      setStream(res.data.data.stream);
      setTitle(res.data.data.title);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchWatch();
    }
  }, [router.query.id]);

  return (
    <div className="container mx-auto px-4 pt-10">
      <h1 className="text-4xl my-7">{title}</h1>
      <iframe
        height="1000"
        allowFullScreen
        className=" w-full"
        src={stream}
      ></iframe>
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
