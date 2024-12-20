import { useLoaderData } from "react-router"
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

//import AudioPlayer from 'material-ui-audio-player';

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

  const [sureId, setSureId] = useState(null)

  const handleChange = (event) => {
    console.log(event.target.value)
    setSureId(event.target.value);
  };

  console.log(surahs.data);




  return (
    <div className='chapters'>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Paper style={{ maxHeight: 350, overflow: 'auto' }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {surahs.data.map((sure) => (
                  <>
                    <ListItem alignItems="flex-start">
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
                          </>
                        }
                      />
                    </ListItem >
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid size={8}>
            Player area
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}
