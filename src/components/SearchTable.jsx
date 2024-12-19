import { useEffect, useState } from "react";

const API_URL = `https://api.acikkuran.com/surah/`;

export default function SearchTable(surahs) {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const myArray = [];

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
    setLoading(false);

    setVerses(myArray);

    // if (myArray) {
    //   console.log('kuran data')
    //   console.log(myArray);
    //   localStorage.setItem("kurad-data", JSON.stringify(myArray))
    // }
  }, []);

  const filteredArray = [];
  const filteredResultData = [];
  async function handleFilteredData() {
    verses.map((data) =>
      filteredArray.push(
        data.filter(
          (item) =>
            item.verse.includes(searchTerm) ||
            item.translation.text.includes(searchTerm)
        )
      )
    );

    const result = await filteredArray.filter((o) =>
      Object.values(o).some((v) => v !== null)
    );
    filteredResultData.push(result);

    console.log("result:" + result.length);
    console.log("filteredResultData:" + filteredResultData.length);

    setFilteredData(...filteredResultData);

    console.log("filteredData" + filteredData.length);

    /** resul console */
    // filteredResultData.map(item => (
    //   item.map(item => (
    //     item.map(item => (
    //       console.log(item)
    //     ))
    //   ))
    // ))

    /** */
  }

  return (
    <div>
      <input
        type="text"
        placeholder="seach by arabic or text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setFilteredData(null);
        }}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      &nbsp;
      <button onClick={handleFilteredData}>Search</button>

      {loading && <div>Loading</div>}
      {!loading && filteredData !== null &&
        filteredData.map((item) =>
          item.map((item) => (
            <>
              <div className=''>
                <div className="main" key={item.id}>
                  <p className="verses-details">{`${item.verse} (${item.verse_number})`}</p>
                  <p className="verses-details-1">{`(${item.verse_number}) ${item.transcription}`}</p>
                  <p className="verses-details-1">{`(${item.verse_number}) ${item.translation.text}`}</p>

                  {console.log(item)}
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
              </div>
            </>
          ))
        )}

    </div>
  );
}
