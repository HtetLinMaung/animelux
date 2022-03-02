import Image from "next/image";
import rest from "../../../utils/rest";
import Link from "next/link";

export default function Latest({ items }) {
  return (
    <div className="container mx-auto px-4 pt-10">
      <h1 className="text-4xl my-7">Latest Animes</h1>

      <div className="grid md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-6 justify-items-center gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-center flex-col"
            style={{ width: 164 }}
          >
            {/* <Image
              className="cursor-pointer rounded-2xl shadow-lg  overflow-visible"
              src={item.img}
              alt={item.name}
              width={164}
              height={229}
            /> */}
            <Link
              href={`/myanime/watch/${item.link.split("/").pop()}`}
              passHref
            >
              <div
                className="cursor-pointer rounded-2xl shadow-lg hover:-translate-y-1 ease-in-out duration-300 bg-cover"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  width: 164,
                  height: 229,
                }}
              ></div>
            </Link>
            <Link
              href={`/myanime/watch/${item.link.split("/").pop()}`}
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
              {item.latest_episode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let items = [];
  const [res, err] = await rest.get("/gganime/recent-releases", {
    page: 1,
  });

  if (!err) {
    items = res.data.data;
  }

  return {
    props: {
      items,
    },
  };
}
