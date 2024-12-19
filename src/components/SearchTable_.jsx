import { useEffect, useState } from 'react'
import axios from 'axios';
const BASE_URL = `https://api.acikkuran.com/surah/`;


export default function SearchTable(verses) {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(true);
  const [surah, setSurah] = useState(verses);
  const [filteredData, setFilteredData] = useState([]);


const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const result = await axios.get(`BASE_URL${3}`)
      setItems(result.data.entries)
      console.log("result.entries", items);
    }
    getItems()
  }, [])


  const myArray = [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        for (let i = 1; i < 115; i++) {
          fetch(BASE_URL + i)
            .then(res => { return res.json() })
            .then(newValue => {
              if (myArray.indexOf(newValue) === -1) {
                myArray.push(newValue);
              }
            });
        }

        myArray.sort(function (a, b) { return a - b; });
        setSurah(myArray);
        //console.log(surah)
      
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }

    //fetchData();
  }, [])


  //const FilteredDataArray = [];

  const FilterData = (id) => {
    const newData = surah[id].data.verses.filter(item => (
      item.verse?.includes(searchTerm) ||
      item.translation?.text?.includes(searchTerm))
    )
    if (newData.length > 0) {
      setFilteredData(newData);
      //console.log(id)
      //FilteredDataArray.push(newData);
    }
  }

  function handleFilteredData() {
    event.preventDefault();

    console.log(myArray)
    for (let i = 1; i < 115; i++) {
      fetch(BASE_URL + i)
            .then(res => { return res.json() })
            .then(newValue => {
              if (myArray.indexOf(newValue) === -1) {
                myArray.push(newValue);
              }
            });
      FilterData(i);
    }   
  }

  return (
    <div>
      <input
        type='text'
        placeholder='seach by arabic or text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredData ? (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.surah_id}</td>
                  <td>{item.verse_number}</td>
                  <td>{item.verse}</td>
                  <td>{item.translation.text}</td>
                </tr>
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
