import { useEffect, useState } from "react";

const API_URL = `https://api.acikkuran.com/surah/`;

export default function SearchTable(surahs) {
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
      <div style={{ paddingBottom: 20, display: count !== null ? "block" : "none" }}>
        <p >
          searcher result {count}
        </p>
        <hr />
      </div>

      <div className="container">
        <div>
          {loading && <div>Loading</div>}
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

                      <div className="footer">
                        <div className="info-main ">
                          <div className="info-container">
                            <p className="info-item">{`Sûre ${ayet.surah_id}`}</p>
                            <p className="info-item">{`Ayet ${ayet.verse_number}`}</p>
                            <p className="info-item">{`Sayfa  ${ayet.page}`}</p>
                            <p className="info-item">{`Cüz   ${ayet.juz_number}`}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              ))
            )}
        </div>
      </div>
    </div >
  );
}
