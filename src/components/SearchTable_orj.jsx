import { useEffect, useState } from "react";

const API_URL = `https://api.acikkuran.com/surah/`;

export default function SearchTable_orj(surahs) {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(null);
  const [surahId, setSurahId] = useState(null);
  const [surahName, setSurahName] = useState(null);

  const myArray = [];

  useEffect(() => {
    const getSurahName = async () => {
      surahName.surah.map((sure) => {
        if (sure.id === surahId) {
          setSurahName(sure.name)
          return;
        }
      })
    }
    getSurahName();
  }, [surahId]);

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
                if (myArray.length <= 114) {
                  myArray.push(surah.data.verses);
                }
              });
          }
        }
      }
    }

    setLoading(true);
    iteraateObject(surahs);
    setVerses(myArray);
    setLoading(false);

  }, []);

  const filteredArray = [];
  const filteredResultData = [];
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

  return (
    <div>
      <p>
        <input
          type="text"
          placeholder="seach by arabic or text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFilteredData(null);
            setCount(null)
          }}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        &nbsp;
        <button onClick={handleFilteredData}>Search</button>
      </p>
      <div style={{ display: count !== null ? "block" : "none" }}>
        <p >
          searcher result {count}
        </p>
      </div>

      <div className="container">
        <div>
          {loading && <div>Loading</div>}
          {!loading && filteredData !== null &&
            filteredData.map((data) =>
              data.map((item) => (
                <>
                  <div className='wrapper'>
                    <div className='header'>
                      {/* <p>{setSurahId(item.surah_id) && surahName}</p> */}
                    </div>
                    <div className="main" key={item.id}>
                      <p className="verses-details">{`${item.verse} (${item.surah_id}:${item.verse_number})`}</p>
                      <p className="verses-details-1">{`(${item.surah_id}:${item.verse_number}) ${item.transcription}`}</p>
                      <p className="verses-details-1">{`(${item.surah_id}:${item.verse_number}) ${item.translation.text}`}</p>
                      <div
                        style={{
                          display:
                            item.translation.footnotes !== null ? "block" : "none",
                        }}
                      >
                        <hr />
                        <div className="verses-footnotes">
                          {
                            item.translation.footnotes !== null &&
                            item.translation.footnotes.map(footnotes => (
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
                          <p className="info-item">Sayfa</p>
                          <p className="info-item">Cüz</p>
                        </div>
                        <div className="info-container">
                          <p className="info-item">{item.surah_id}</p>
                          <p className="info-item">{item.page}</p>
                          <p className="info-item">{item.juz_number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
        </div>
      </div>
    </div>
  );
}
