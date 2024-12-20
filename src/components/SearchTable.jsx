import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

const API_URL = `https://api.acikkuran.com/surah/`;

export default function SearchTable(surahs) {
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
            fetch(API_URL + id)
              .then((res) => {
                return res.json();
              })
              .then((surah) => {
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
      marginTop: theme.spacing(2),
    },
  }));

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

      <div style={{ paddingBottom: 20, display: count !== null ? "block" : "none" }}>
        <p>
          <Root>
            <Divider>{`( arama sonucu ${count} )`}</Divider>
          </Root>
        </p>
      </div>

      <div className="container">
        <div>
          {loading && <div>yükleniyor...</div>}
          {!loading && filteredData !== null &&
            filteredData.map((data) =>
              data.map((ayet) => (
                <>
                  <div key={ayet.id} className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-5xl font-bold text-gray-900 sm:text-xlg dark:text-white">{`${ayet.verse} (${ayet.surah_id}:${ayet.verse_number})`}</h5>
                    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{`(${ayet.surah_id}:${ayet.verse_number}) ${ayet.transcription}`}</p>
                    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{`(${ayet.surah_id}:${ayet.verse_number}) ${ayet.translation.text}`}</p>

                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                      <div className="text-left rtl:text-right">
                        <div className="mb-1 text-xs">
                          <div style={{ display: ayet.translation.footnotes !== null ? "block" : "none" }}>
                            <div className="verses-footnotes">
                              {
                                ayet.translation.footnotes !== null &&
                                ayet.translation.footnotes.map(footnotes => (
                                  <p key={footnotes.id}>{`[${footnotes.number}] ${footnotes.text}`}</p>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                        <div className="-mt-1 font-sans text-sm font-semibold"></div>
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

                    </div>
                  </div >
                </>
              ))
            )}
        </div>
      </div>
    </div >
  );
}
