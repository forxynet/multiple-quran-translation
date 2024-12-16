//import { useRef, useState, useEffect } from 'react';
import { useLoaderData } from "react-router"
//import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from './AudioPlayer';

export default function Surahs() {
  const surahs = useLoaderData();
  
  return (
    <div className='chapters'>
      {surahs.data.map((sure) => (
        <>
          <div className='chapters-details-1' >
            <p>{sure.id}</p>
            <p>{sure.name}</p>
            <p>{sure.name_en}</p>
            <p>{sure.name_original}</p>
            <p>{sure.verse_count}</p>

            <div className='surahs-details' key={sure.id}>
              <div id="container-player">                
                <div id="playerDiv">            
                  <AudioPlayer lang="TR" url={sure.audio.mp3} name={sure.name} /> 
                </div>
              </div>

              <div id="container-player">                
                <div id="playerDiv">
                    <AudioPlayer lang="EN" url={sure.audio.mp3_en} name={sure.name_en} /> 
                     {/* <ReactAudioPlayer url={sure.audio.mp3_en}  /> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export async function loader() {
  const response = await fetch('https://api.acikkuran.com/surahs');
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const data = await response.json();
  return await data;
}