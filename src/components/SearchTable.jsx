import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export default function SearchTable({ surahs }) {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(null);
  const AyetArray = [];
  const filteredArray = [];
  const filteredResultData = [];

  useEffect(() => {
    async function iteraateObject(obj) {
      for (var key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          iteraateObject(obj[key]);
        } else {
          if (key === "id") {
            let id = obj[key];
            fetch('https://api.acikkuran.com/surah/' + id).then((res) => {
              return res.json();
            }).then((surah) => {
              if (AyetArray.length <= 114) {
                AyetArray.push(surah.data.verses);
              }
            });
          }
        }
      }
    }

    setLoading(true);
    iteraateObject(surahs);
    setVerses(AyetArray);
    setLoading(false);

  }, []);

  async function handleFilteredData() {
    console.log(verses)
    verses.map((data) =>
      filteredArray.push(
        data.filter(
          (item) =>
            item.verse.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.transcription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.translation.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );

    const result = await filteredArray.filter((o) =>
      Object.values(o).some((v) => v !== null)
    );

    filteredResultData.push(result);

    setCount(result.length);
    setFilteredData(...filteredResultData);
  }

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(1),
    },
  }));

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
    <div>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 315 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFilteredData(null);
            setCount(null)
          }}
          placeholder="ara arabic yada text"
          inputProps={{ 'aria-label': 'ara arabic yada text' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFilteredData}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <div style={{ display: count !== null ? "block" : "none" }}>
        <p>
          <Root>
            <Divider>
              <Typography variant="label" color="common.white">
                {` Aramanızda ${count} Ayet bulundu.`}
              </Typography>
            </Divider>
          </Root>
        </p>
        <div style={{ display: count > 0 ? "block" : "none" }}>
          <Paper style={{ maxHeight: 500, overflow: 'auto', marginTop: 20, padding: 10 }}>
            <div className="container">
              <div>
                {loading && <div>yükleniyor...</div>}
                {!loading && filteredData !== null &&
                  filteredData.map((data) =>
                    data.map((ayet) => (
                      <>
                        <div key={ayet.id}>
                          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
                            {`${ayet.verse} (${ayet.surah_id}:${ayet.verse_number})`}
                          </Typography>
                          <div style={{ paddingBottom: 15, paddingTop: 15 }}>
                            <Divider />
                          </div>
                          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                            {`(${ayet.surah_id}:${ayet.verse_number}) ${ayet.transcription}`}
                          </Typography>
                          <div style={{ paddingBottom: 15, paddingTop: 15 }}>
                            <Divider />
                          </div>
                          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                            {`(${ayet.surah_id}:${ayet.verse_number}) ${ayet.translation.text}`}
                          </Typography>

                          <div>
                            <div style={{ display: ayet.translation.footnotes !== null ? "block" : "none" }}>
                              <div className="verses-footnotes">
                                {
                                  ayet.translation.footnotes !== null &&
                                  ayet.translation.footnotes.map(footnotes => (
                                    <p key={footnotes.id}>
                                      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 15 }}>
                                        {`[${footnotes.number}] ${footnotes.text}`}
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

                          <Box sx={{ flexGrow: 1 }} style={{ paddingBottom: 15 }}>
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
                                  {ayet.page}
                                </Item>
                              </Grid>
                              <Grid size={3}>
                                <Item>
                                  {ayet.juz_number}
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                          <div style={{ paddingBottom: 15 }}>
                            <Divider />
                          </div>
                        </div>
                      </>
                    ))
                  )}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
