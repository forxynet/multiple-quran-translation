import { useState, useEffect } from "react";
import { useLoaderData } from "react-router"

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
        //console.log(data.data.foodnotes);
      }

      getVerses();
    }

  }, [selectedSureId]);

  return (
    <div className='chapters'>
      <div className="container">
        <div className="select">
          <select value={selectedSureId} onChange={e => setSelectedSureId(e.target.value)}>
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
              <div className='wrapper'>
                <div className='header'>
                  <p>{selectedSureName} Sûresi</p>
                </div>

                <div className='main'>
                  <p className="verses-details">{`${ayet.verse} (${ayet.verse_number})`}</p>
                  <p className="verses-details-1">{`(${ayet.verse_number}) ${ayet.transcription}`}</p>
                  <p className="verses-details-1">{`(${ayet.verse_number}) ${ayet.translation.text}`}</p>

                  <div style={{ display: (ayet.translation.footnotes !== null ? 'block' : 'none') }}>
                    <hr />
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

                <div className="footer">
                  <hr />
                  <div className="info-main ">
                    <div className="info-container">
                      <p className="info-item">Sure No</p>
                      <p className="info-item">Ayet Sayısı</p>
                      <p className="info-item">Ayet No</p>
                      <p className="info-item">Sayfa</p>
                      <p className="info-item">Cüz</p>
                    </div>
                    <div className="info-container">
                      <p className="info-item">{selectedSureId}</p>
                      <p className="info-item">{selectedSureVerseCount}</p>
                      <p className="info-item">{ayet.id}</p>
                      <p className="info-item">{ayet.page}</p>
                      <p className="info-item">{ayet.juz_number}</p>
                    </div>
                  </div>
                </div>

              </div >
            </>
          ))}
        </div>
      </div>
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