import { useLoaderData } from "react-router"
import Paper from '@mui/material/Paper';
import AccordionPlay from "../../components/AccordionPlay";

export default function SurahAudio() {
  const surahs = useLoaderData();

  return (
    <div className='chapters'>
      <Paper style={{ maxHeight: 500, overflow: 'auto', padding: 10 }}>
        <AccordionPlay surahs={surahs} />
      </Paper>
    </div>
  )
}


export async function loader() {
  const response = await fetch('https://api.acikkuran.com/surahs');
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const data = await response.json();
  return await data;
}