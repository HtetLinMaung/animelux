import { useContext } from "react";
import { appContext } from "../context/AppProvider";
import Navbar from "./Navbar";
import SearchModal from "./SearchModal";

export default function Layout({ children }) {
  const [state, dispatch] = useContext(appContext);

  return (
    <div>
      <Navbar />
      <SearchModal open={state.search_modal} />
      {children}
    </div>
  );
}
