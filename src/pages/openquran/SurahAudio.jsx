//import AudioPlayer from 'material-ui-audio-player';//import { useRef, useState, useEffect } from 'react';
import { useLoaderData } from "react-router"
//import AudioPlayer from './AudioPlayer';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { makeStyles } from '@material-ui/styles';

export async function loader() {
  const response = await fetch('https://api.acikkuran.com/surahs');
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const data = await response.json();
  return await data;
}

export default function SurahAudio() {
  const surahs = useLoaderData();

  const theme = useTheme();
  const muiTheme = createMuiTheme({});

  const useStyles = makeStyles((theme) => {
    return {
      root: {
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      },
      loopIcon: {
        color: '#3f51b5',
        '&.selected': {
          color: '#0921a9',
        },
        '&:hover': {
          color: '#7986cb',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      playIcon: {
        color: '#f50057',
        '&:hover': {
          color: '#ff4081',
        },
      },
      replayIcon: {
        color: '#e6e600',
      },
      pauseIcon: {
        color: '#0099ff',
      },
      volumeIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      volumeSlider: {
        color: 'black',
      },
      progressTime: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      mainSlider: {
        color: '#3f51b5',
        '& .MuiSlider-rail': {
          color: '#7986cb',
        },
        '& .MuiSlider-track': {
          color: '#3f51b5',
        },
        '& .MuiSlider-thumb': {
          color: '#303f9f',
        },
      },
    };
  });

  return (
    <div className='chapters'>
      {surahs.data.map((sure) => (
        <>

          <Card sx={{ display: 'flex', marginTop: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {sure.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary' }}
                >
                  {sure.name_original}
                </Typography>
              </CardContent>
              {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box> */}


              <ThemeProvider theme={muiTheme}>
                <AudioPlayer
                  width="500px"
                  useStyles={useStyles}
                  src={sure.audio.mp3}
                  loop={true}
                />
              </ThemeProvider>
            </Box>
          </Card>

          {/* <div className='chapters-details-1' >
            <p>{sure.id}</p>
            <p>{sure.name}</p>
            <p>{sure.name_en}</p>
            <p>{sure.name_original}</p>
            <p>{sure.verse_count}</p>

            <div className='surahs-details' key={sure.id}>
              <div id="container-player">
                <div id="playerDiv">
                  <AudioPlayer lang="TR" url={sure.audio.mp3} name={sure.name} />
                </div>
              </div>

              <div id="container-player">
                <div id="playerDiv">
                  <AudioPlayer lang="EN" url={sure.audio.mp3_en} name={sure.name_en} />
                </div>
              </div>
            </div>
          </div> */}
        </>
      ))}
    </div>
  )
}
