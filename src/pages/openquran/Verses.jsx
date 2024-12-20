import { useState, useEffect } from "react";
import { useLoaderData } from "react-router"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';


import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function Verses() {
  const surahs = useLoaderData();
  const [selectedSureId, setSelectedSureId] = useState(null);
  const [selectedSureName, setSelectedSureName] = useState(null);
  const [selectedSureVerseCount, setSelectedSureVerseCount] = useState(null);
  const [verses, setVerses] = useState(null);

  useEffect(() => {
    if (selectedSureId > 0) {
      const getVerses = async () => {
        const response = await fetch('https://api.acikkuran.com/surah/' + selectedSureId);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setVerses(data);
        setSelectedSureName(data.data.name);
        setSelectedSureVerseCount(data.data.verse_count);
      }

      getVerses();
    }

  }, [selectedSureId]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));


  return (
    <div>
      <div className="container">
        <div className="select">
          <select value={selectedSureId} onChange={e => setSelectedSureId(e.target.value)}>
            <option key="0">Okumak için bir sûre seçin..</option>
            <>
              {surahs && surahs.data.map((sure) => (
                <option key={sure.id} value={sure.id}>{sure.name}</option>
              ))}
            </>
          </select>
        </div>
      </div>
      {verses && verses.data.verses.map((ayet) => (
        <>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
            {`(${selectedSureId}:${selectedSureVerseCount}) ${selectedSureName} Sûresi`}
          </Typography>

          {verses.data.zero !== null &&
            <div style={{ display: (selectedSureId > 1 && ayet.verse_number == 1 ? 'block' : 'none'), marginTop: 20 }}>
              <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
                {`${verses.data.zero.verse}`}
              </Typography>
              <Divider />
              <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                {`${verses.data.zero.transcription}`}
              </Typography>
              <Divider />
              <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                {`${verses.data.zero.translation.text}`}
              </Typography>
            </div>
          }

          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
            {`${ayet.verse} (${selectedSureId}:${ayet.verse_number})`}
          </Typography>
          <Divider />
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
            {`(${selectedSureId}:${ayet.verse_number}) ${ayet.transcription}`}
          </Typography>
          <Divider />
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
            {`(${selectedSureId}:${ayet.verse_number}) ${ayet.translation.text}`}
          </Typography>

          <div style={{ display: (ayet.translation.footnotes !== null ? 'block' : 'none') }}>
            <div className="verses-footnotes">
              {
                ayet.translation.footnotes !== null &&
                ayet.translation.footnotes.map(footnotes => (
                  <p key={footnotes.id}>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                      {`[${footnotes.number}] ${footnotes.text}`}
                    </Typography>
                  </p>
                ))
              }
            </div>
          </div>

          <Box sx={{ flexGrow: 1 }} style={{ paddingBottom: 15, paddingTop: 15 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid size={3}>
                <Item>
                  Sure
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  Ayet
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  Sayfa
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  Cüz
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  {ayet.surah_id}
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  {ayet.verse_number}
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  {`${ayet.page}:${ayet.id}`}
                </Item>
              </Grid>
              <Grid size={3}>
                <Item>
                  {ayet.juz_number}
                </Item>
              </Grid>
            </Grid>
          </Box>
        </>
      ))
      }
    </div >
  )
}

export async function loaderVerses() {
  const response = await fetch('https://api.acikkuran.com/surahs');
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const data = await response.json();
  return await data;
}