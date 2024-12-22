import ReactAudioPlayer from 'react-audio-player';

export default function Buttons({ name, url, id }) {

  // pass the event to the handler
  const handlePlay = e => {
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(audioEl => {
      audioEl.pause()
      audioEl.currentTime = 0;
    })

    // get the clicked audio element and play
    const thisAudio = e.target.querySelector('audio');
    thisAudio.currentTime = 0;
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