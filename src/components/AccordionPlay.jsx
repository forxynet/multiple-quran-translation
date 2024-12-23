import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Buttons from './Buttons';
import Typography from '@mui/material/Typography';

export default function AccordionPlay({ surahs }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(audioEl => {
      audioEl.pause()
      audioEl.currentTime = 0;
    })
  };

  return (
    <>
      {
        surahs && surahs.data.map(sure => (
          <>
            <Accordion key={sure.id} expanded={expanded === `panel-${sure.id}`} onChange={handleChange(`panel-${sure.id}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${sure.id}-content`}
                id={`panel-${sure.id}`}>
                <Typography variant="label" color="common.white">
                  {`${sure.name} (${sure.verse_count})`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className='flex-container'>
                  <div>
                    <Buttons video_button={"videoLangTr"} url={sure.audio.mp3} id={sure.id} />
                  </div>
                  <div>
                    <Buttons video_button={"videoLangEn"} url={sure.audio.mp3_en} id={sure.id} />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion >
          </>
        ))
      }
    </>
  );
}