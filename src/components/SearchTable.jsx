import { useEffect, useState } from 'react'

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
        }
        else {
          if (key === "id") {
            let id = obj[key];
            fetch(API_URL + id)
              .then(res => { return res.json() })
              .then(surah => {
                if (myArray.length <= 114) {
                  myArray.push(surah.data.verses)
                }
              });
          }
        }
      }
    }

    setLoading(true);
    iteraateObject(surahs);
    setLoading(false);

    setVerses(myArray)

    // if (myArray) {
    //   console.log('kuran data')
    //   console.log(myArray);
    //   localStorage.setItem("kurad-data", JSON.stringify(myArray))
    // }
    
  }, []);


  const filteredArray = [];
  const filteredResultData = [];
  async function handleFilteredData() {
    verses.map(data => (
      filteredArray.push((data.filter(item => (
        item.verse.includes(searchTerm) ||
        item.translation.text.includes(searchTerm))
      )))
    ))

    const result = await filteredArray.filter(o => Object.values(o).some(v => v !== null));
    filteredResultData.push(result);
    
    console.log("result:"+result.length);
    console.log("filteredResultData:"+filteredResultData.length);


    setFilteredData(...filteredResultData);

    console.log("filteredData"+filteredData.length);

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
        type='text'
        placeholder='seach by arabic or text'
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setFilteredData(null); }}
        className='mb-4 p-2 border border-gray-300 rounded'
      />&nbsp;
      <button onClick={handleFilteredData}>Search</button>
      {loading && <div>Loading</div>}
      {!loading && (
        <table border="1">
          <thead>
            <tr>
              <td>
                Sure
              </td>
              <td>
                Ayet
              </td>
              <td>
                Verse
              </td>
              <td>
                Text
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredData !=null && filteredData ? (
              filteredData.map(item => (
                item.map(item => (
                    <tr key={item.id}>
                      <td>{item.surah_id}</td>
                      <td>{item.verse_number}</td>
                      <td>{item.verse}</td>
                      <td>{item.translation.text}</td>
                    </tr>
                 ))
              ))
            ) : (
              <tr>
                <td colSpan="5">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
