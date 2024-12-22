import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Buttons({ name, url, id }) {

  const [playId, setPlayId] = useState(null); // not needed

  useEffect(() => {
    setPlayId(id);
  }, [id])

  // pass the event to the handler
  const handlePlay = e => {
    // get all audio elements and stop them all
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(audioEl => {
      audioEl.pause()
      audioEl.currentTime = 0;
    })

    // get the clicked audio element and play
    const thisAudio = e.target.querySelector('audio');
    if (playId !== id) {
      thisAudio.pause;
      thisAudio.currentTime = 0;
    }
    console.log(playId);
    thisAudio.play()
  }

  return (
    <div className="drum-button">
      <button className='drum-pad' onClick={handlePlay}>{name}
        <ReactAudioPlayer src={url} />
      </button>
    </div>
  )
}