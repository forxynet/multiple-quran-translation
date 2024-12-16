import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { BsPlayFill } from "react-icons/bs";

import IconButton from '@mui/material/IconButton';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import Stack from '@mui/material/Stack';


const PlayTwicePlayer = ({ lang, name, url }) => {

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
        thisAudio.play()
    }

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="Play" >
                    <SlowMotionVideoIcon onClick={handlePlay}/>
                </IconButton>
                <button onClick={handlePlay}>{`${name} (${lang})`}
                    <ReactAudioPlayer src={url} />
                </button>
            </Stack>
        </div>
    );
};

export default PlayTwicePlayer;