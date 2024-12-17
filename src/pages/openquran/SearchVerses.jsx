//import { useLoaderData } from "react-router";
import SearchTable from "../../components/SearchTable";

export default function SearchVerses() {
  //const verses = useLoaderData();

  return (
    <div>
      <SearchTable  />
    </div>
  )
}

// export async function loaderSearchVerses() {
//   const response = await fetch('https://api.acikkuran.com/surahs');
//   if (!response.ok) {
//     throw new Error(`HTTP error: Status ${response.status}`);
//   }
//   const verses = await response.json();
//   return await verses;
// }