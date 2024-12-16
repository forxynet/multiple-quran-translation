import { useState, useEffect } from "react";
import { useLoaderData } from "react-router"

export default function Verses() {
  const surahs = useLoaderData();
  const [selectedSure, setSelectedSure] = useState(null);
  const [verses, setVerses] = useState(null);

  useEffect(() => {
    if (selectedSure > 0) {
      const getVerses = async () => {
        const response = await fetch('https://api.acikkuran.com/surah/' + selectedSure);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        setVerses(data);
        //console.log(data);
      }

      getVerses();
    }

  }, [selectedSure]);

  return (
    <div className='chapters'>
      <div className="container">
        <div className="select">
          <select value={selectedSure} onChange={e => setSelectedSure(e.target.value)}>
            <option key="0">Bir sure seçin..</option>
            <>
              {surahs && surahs.data.map((sure) => (
                <option key={sure.id} value={sure.id}>{sure.name}</option>
              ))}
            </>
          </select>
        </div>
      </div>

      <div className="container">
        <div>
          {verses && verses.data.verses.map((ayet) => (
            <>
              <div className='verses-details-1'>
                <p>{`${ayet.id}. ayet`}</p>
                <p>{`${ayet.page}. sayfa ${ayet.juz_number}. cüz`}</p>

                <div className='verses-details'>
                  <p>{ayet.verse}</p>
                </div>
                <div className="verses-details-1">
                  <p>{ayet.transcription}</p>
                </div>
                <div className='verses-details-1'>
                  <p>{ayet.translation.text}</p>
                </div>

                {
                  ayet.translation.foodnotes &&
                  //ayet.translation.foodnotes.length > 0 &&
                  
                  ayet.translation.foodnotes.map(notes => (
                      <p key={notes.id}>{ notes.text}</p>
                  ))
                }
                {console.log(ayet.translation)}

              </div>
            </>
          ))}
        </div>
      </div>
    </div>
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