import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Animelux() {
  const router = useRouter();

  useEffect(() => {
    router.push("/animelux/latest/page/1");
  }, []);

  return <div></div>;
}
