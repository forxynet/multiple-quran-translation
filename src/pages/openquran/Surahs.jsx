import { useLoaderData, Link } from "react-router"
import ReactAudioPlayer from 'react-audio-player';

export async function loader() {
  const response = await fetch('https://api.acikkuran.com/surahs');
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const data = await response.json();
  return await data;
}

export default function Surahs() {
  const surahs = useLoaderData();

  console.log(surahs.data)

  return (
    <div className='chapters'>
      {surahs.data.map((sure) => (
        <>
          <div className='chapters-details' key={sure.id}>
            <div className='chapters'>
              {/* <Link to={`editions/${sure.id.toString()}`} key={sure.id}> */}
                <p>{`${sure.id}. Sure ${sure.name} ${sure.name_original} Ayet sayısı ${sure.verse_count} Sayfa ${sure.page_number + 1}`}</p>
              {/* </Link> */}
            </div>
            
            <div className="flex-container">
              <div className="item">TR</div>
              <div>
                <ReactAudioPlayer src={sure.audio.mp3} controls preload="none" />
              </div>
            </div>
            <div className="flex-container">
              <div className="item">EN</div>
              <div>
                <ReactAudioPlayer src={sure.audio.mp3_en} controls preload="none" />
              </div>
            </div>

          </div>
        </>
      ))}
    </div>
  )
}

