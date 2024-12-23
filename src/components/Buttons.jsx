import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Buttons({ video_button, name, url }) {
  const [play, setPlay] = useState(true);

  // pass the event to the handler
  const handlePlay = e => {
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(audioEl => {
      audioEl.pause()
      audioEl.currentTime = 0;
    })

    // get the clicked audio element and play
    const thisAudio = e.target.querySelector('audio');

    if (play) {
      thisAudio.play()
      setPlay(false);
    }
    else {
      setPlay(true);
    }
  }

  return (
    <div className={video_button}>
      <button className={play ? 'fa fa-play' : 'fa fa-pause'} onClick={handlePlay}>{name}
        <ReactAudioPlayer id={video_button} src={url} />
      </button>
    </div >
  )
}