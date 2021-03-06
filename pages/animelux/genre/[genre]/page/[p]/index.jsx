import rest from "../../../../../../utils/rest";
import AnimeList from "../../../../../../components/AnimeList";

// uppercase first char
function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Popular(props) {
  return (
    <AnimeList
      {...props}
      module={`genre/${props.genre}`}
      title={`Genre ${ucfirst(props.genre)}`}
    />
  );
}

export async function getServerSideProps(context) {
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
