import { useLoaderData } from "react-router"
import { useState, useRef } from 'react';
//import AudioPlayer from 'react-h5-audio-player';
import Buttons from "../../components/Buttons";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function SurahAudio() {
  const surahs = useLoaderData();

  //console.log(surahs)
  return (
    <div className='chapters'>
      <Paper style={{ overflow: 'auto' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {surahs.data.map((sure) => (
            <>
              <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                  {sure.verse_count}
                </ListItemAvatar>
                <ListItemText value={sure.id}
                  primary={sure.name_original}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                      >
                        {sure.name}
                      </Typography>

                      {/* src={sure.audio.mp3} */}

                      <Buttons name={`TR-${sure.name}`} url={sure.audio.mp3} id={sure.id} />
                      <Buttons name={`EN-${sure.name}`} url={sure.audio.mp3_en} id={sure.id} />

                    </>
                  }
                />
              </ListItem >
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
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