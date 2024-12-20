import { useState, useEffect } from "react";
import { useLoaderData } from "react-router"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

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
          <div className="w-full max-w-md p-4 bg-gray-200 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{`(${selectedSureId}:${selectedSureVerseCount}) ${selectedSureName} Sûresi`}</h4>
            </div>
            <div className="flow-root">

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {verses.data.zero !== null &&
                  <div style={{ display: (selectedSureId > 1 && ayet.verse_number == 1 ? 'block' : 'none'), marginTop: 20 }}>
                    <div className="py-3 sm:py-4 ">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                          <h5 style={{ fontSize: 18 }} className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {`${verses.data.zero.verse}`}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {`${verses.data.zero.transcription}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {`${verses.data.zero.translation.text}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-xlarge text-gray-900 truncate dark:text-white">
                        <h4 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{`${ayet.verse} (${selectedSureId}:${ayet.verse_number})`}</h4>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {`(${selectedSureId}:${ayet.verse_number}) ${ayet.transcription}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {`(${selectedSureId}:${ayet.verse_number}) ${ayet.translation.text}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <div style={{ display: (ayet.translation.footnotes !== null ? 'block' : 'none') }}>
                          <div className="verses-footnotes">
                            {
                              ayet.translation.footnotes !== null &&
                              ayet.translation.footnotes.map(footnotes => (
                                <p key={footnotes.id}>{`[${footnotes.number}] ${footnotes.text}`}</p>
                              ))
                            }
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
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

                {/* <div className="footer">
                  <div className="info-main ">
                    <div className="info-container">
                      <p className="info-item">{`Sûre ${ayet.surah_id}`}</p>
                      <p className="info-item">{`Ayet ${ayet.verse_number}`}</p>
                      <p className="">{`Sayfa ${ayet.page}:${ayet.id}`}</p>
                      <p className="info-item">{`Cüz ${ayet.juz_number}`}</p>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>
          </div>
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