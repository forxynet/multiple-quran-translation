import { useEffect, useState } from 'react'

export default function SearchTable() {
  const [searchTerm, setSearchTerm] = useState();
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
  const getVerses = async () => {
    const response = await fetch('https://api.acikkuran.com/surah/' + 2);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
    console.log(data);
    setData(data);
  }
  getVerses();
  }, []);

  function handleFilteredData() {   
    
    console.log(searchTerm);
    
    const newData = data.data.verses.filter(item => (
      item.verse.includes(searchTerm) ||
      item.transcription.includes(searchTerm) ||
      item.translation.text.includes(searchTerm))  
    )
    

    setFilteredData(newData);
    console.log(newData);
  }


  return (
    <div>
      <input
        type='text'
        placeholder='seach by verse, transcription or text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='mb-4 p-2 border border-gray-300 rounded'
      />&nbsp;
      <button onClick={handleFilteredData}>Search</button>
      <p>geliştiriliyor şimdi sadece bakara süresinde</p>
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
              Transcription
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
                <td>{item.transcription}</td>
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
    </div>
  )
}
