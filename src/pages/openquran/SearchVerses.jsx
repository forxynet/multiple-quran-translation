import { useLoaderData } from "react-router";
import SearchTable from "../../components/SearchTable";

export default function SearchVerses() {
  const verses = useLoaderData();

  return (
    <div>
      <SearchTable surahs={verses} />
    </div>
  )
}

export async function loaderSurahs() {
  const response = await fetch('https://api.acikkuran.com/surahs');
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const data = await response.json();
  return await data;
}