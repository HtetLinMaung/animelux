import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Latest() {
  const router = useRouter();

  useEffect(() => {
    router.push("/animelux/latest/page/1");
  }, []);

  return <div></div>;
}
