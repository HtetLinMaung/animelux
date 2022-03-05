import rest from "../../../../../../utils/rest";
import AnimeList from "../../../../../../components/AnimeList";

export default function SubCategory(props) {
  return (
    <AnimeList
      {...props}
      module={`sub-category/${props.sub}`}
      title={props.sub.toUpperCase()}
    />
  );
}

export async function getServerSideProps(context) {
  const { p, sub } = context.query;

  let items = [];
  let pages = [1, 2, 3, 4, 5];
  const [res, err] = await rest.get(`/gganime/sub-category/${sub}`, {
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
      sub,
    },
  };
}
