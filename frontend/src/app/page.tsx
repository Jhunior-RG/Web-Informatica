
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      Pagina Principal

      <Link href={"/pensum"}>Pensum</Link>
    </div>
  );
}
