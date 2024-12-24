import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router"
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
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <>
      <div className="container">
        <div className="select">
          <select key={selectedSureId} value={selectedSureId} onChange={e => setSelectedSureId(e.target.value)}>
            <>
              <option key="0">Bir sûre seçiniz...</option>
              {surahs && surahs.data.map((sure) => (
                <option key={sure.id} value={sure.id}>{sure.id} - {sure.name}</option>
              ))}
            </>
          </select>
        </div>
      </div>

      <div style={{ display: selectedSureId >= 1 ? "block" : "none" }}>
        <Paper style={{ maxHeight: 500, overflow: 'auto', padding: 10 }}>
          {verses && verses.data.verses.map((ayet) => (
            <>
              <div key={ayet.id}>
                {ayet.id === 1 &&
                  <>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 17, textAlign: 'center' }}>
                      {`(${selectedSureId}:${selectedSureVerseCount}) ${selectedSureName} Sûresi`}
                    </Typography>

                    <div style={{ paddingBottom: 15, paddingTop: 15 }}>
                      <Divider />
                    </div>

                  </>
                }
                {verses.data.zero !== null &&
                  <div key={verses.data.zero.verse} style={{ display: (selectedSureId > 1 && ayet.verse_number == 1 ? 'block' : 'none'), marginTop: 20 }}>

                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 17, textAlign: 'center' }}>
                      {`(${selectedSureId}:${selectedSureVerseCount}) ${selectedSureName} Sûresi`}
                    </Typography>

                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 17 }}>
                      {`${verses.data.zero.verse}`}
                    </Typography>

                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                      {`${verses.data.zero.transcription}`}
                    </Typography>

                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                      {`${verses.data.zero.translation.text}`}
                    </Typography>

                    <div style={{ paddingBottom: 15, paddingTop: 15 }}>
                      <Divider />
                    </div>

                  </div>
                }

                <div key={ayet.verse_number} style={{ paddingBottom: 5 }}>

                  <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 17 }}>
                    {`${ayet.verse} (${selectedSureId}:${ayet.verse_number})`}
                  </Typography>

                  <div style={{ paddingBottom: 15, paddingTop: 15 }} />

                  <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                    {`(${selectedSureId}:${ayet.verse_number}) ${ayet.transcription}`}
                  </Typography>

                  <div style={{ paddingBottom: 15, paddingTop: 15 }} />

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
                              {`[${footnotes.number}]
                                 ${(ayet.surah_id === 2 && ayet.verse_number === 43 && footnotes.number === 1) ||
                                  (ayet.surah_id === 2 && ayet.verse_number === 45 && footnotes.number === 2) ||
                                  (ayet.surah_id === 2 && ayet.verse_number === 238 && footnotes.number === 1) ||
                                  (ayet.surah_id === 2 && ayet.verse_number === 238 && footnotes.number === 2) ||
                                  (ayet.surah_id === 4 && ayet.verse_number === 101 && footnotes.number === 3) ||
                                  (ayet.surah_id === 4 && ayet.verse_number === 103 && footnotes.number === 2) ||
                                  (ayet.surah_id === 5 && ayet.verse_number === 6 && footnotes.number === 2) ||
                                  (ayet.surah_id === 5 && ayet.verse_number === 12 && footnotes.number === 1) ||
                                  (ayet.surah_id === 11 && ayet.verse_number === 114 && footnotes.number === 1) ||
                                  (ayet.surah_id === 11 && ayet.verse_number === 114 && footnotes.number === 2) ||
                                  (ayet.surah_id === 19 && ayet.verse_number === 59 && footnotes.number === 1) ||
                                  (ayet.surah_id === 20 && ayet.verse_number === 132 && footnotes.number === 1) ||
                                  (ayet.surah_id === 21 && ayet.verse_number === 73 && footnotes.number === 1) ||
                                  (ayet.surah_id === 22 && ayet.verse_number === 41 && footnotes.number === 1) ||
                                  (ayet.surah_id === 27 && ayet.verse_number === 3 && footnotes.number === 1) ||
                                  (ayet.surah_id === 31 && ayet.verse_number === 4 && footnotes.number === 1) ||
                                  (ayet.surah_id === 62 && ayet.verse_number === 9 && footnotes.number === 3) ||
                                  (ayet.surah_id === 108 && ayet.verse_number === 2 && footnotes.number === 1) ||
                                  (ayet.surah_id === 108 && ayet.verse_number === 2 && footnotes.number === 2)

                                  ? `${footnotes.text} [ HB - Dipnot ] Bu konuda daha doğru ve detay bilgilere [ https://kuran.diyanet.gov.tr | https://islamansiklopedisi.org.tr/arama ] gibi muteber adreslerden araştırma yaparak ulaşabilirsiniz.` : footnotes.text}`}
                            </Typography>
                          </p>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div style={{ paddingBottom: 15 }}>
                  <Divider />
                </div>

                {verses.data?.verse_count === ayet.verse_number &&
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
                }
              </div>
            </>
          ))
          }
        </Paper>
      </div>
    </>
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

