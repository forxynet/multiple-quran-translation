import { useLoaderData } from "react-router"
import { useState, useRef } from 'react';
//import AudioPlayer from 'react-h5-audio-player';
//import Buttons from "../../components/Buttons";
//import MenuPlay from "../../components/MenuPlay";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import AccordionPlay from "../../components/AccordionPlay";

export default function SurahAudio() {
  const surahs = useLoaderData();

  //console.log(surahs)
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