import rest from "../../../../../../utils/rest";
import AnimeList from "../../../../../../components/AnimeList";

export default function Status(props) {
  return (
    <AnimeList
      {...props}
      module={`status/${props.status}`}
      title={`${props.status.toUpperCase()} ANIME`}
    />
  );
}

export async function getServerSideProps(context) {
  const { p, status } = context.query;

  let items = [];
  let pages = [1, 2, 3, 4, 5];
  const [res, err] = await rest.get(`/gganime/${status}`, {
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
      status,
    },
  };
}
