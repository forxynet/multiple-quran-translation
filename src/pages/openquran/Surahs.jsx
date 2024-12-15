import { useLoaderData } from "react-router"
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
          <div className='chapters-details-1'>
            <p>{sure.id}</p>
            <p>{sure.name}</p>
            <p>{sure.name_en}</p>
            <p>{sure.name_original}</p>
            <p>{sure.verse_count}</p>


            <div className='surahs-details' key={sure.id}>
              <div id="container-player">
                <div id="nameDiv">
                  TR
                </div>
                <div id="playerDiv">
                  <ReactAudioPlayer src={sure.audio.mp3} controls preload="none" />
                </div>
              </div>

              <div id="container-player">
                <div id="nameDiv">
                  EN
                </div>
                <div id="playerDiv">
                   <ReactAudioPlayer src={sure.audio.mp3_en} controls preload="none" />
                </div>
              </div>



              {/* <div className="flex-container">
                <div className="itemLanTr"></div>
                <div className="itemPlayer">
                  <ReactAudioPlayer src={sure.audio.mp3} controls preload="none" />
                </div>
              </div>
              <div className="flex-container">
                <div className="itemLanEn"></div>
                <div className="itemPlayer">
                  <ReactAudioPlayer src={sure.audio.mp3_en} controls preload="none" />
                </div>
              </div>*/}
            </div> 
          </div>
        </>
      ))}
    </div>
  )
}

