import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Buttons from './Buttons';

export default function AccordionPlay(surahs) {
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
        surahs && surahs.surahs.data.map(sure => (
          <>
            <Accordion key={sure.id} expanded={expanded === `panel-${sure.id}`} onChange={handleChange(`panel-${sure.id}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${sure.id}-content`}
                id={`panel-${sure.id}`}>
                {`${sure.name} (${sure.name_original})`}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Buttons name={`(TR) ${sure.name} (${sure.verse_count})`} url={sure.audio.mp3} id={sure.id} />
                </Typography>
                <Typography>
                  <Buttons name={`(EN) ${sure.name} (${sure.verse_count})`} url={sure.audio.mp3_en} id={sure.id} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </>
        ))
      }
    </>
  );
}