import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

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
                {`${sure.name} (${sure.verse_count})`}
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  <Buttons video_button={"videoLangTr"} url={sure.audio.mp3} id={sure.id} />
                </p>
                <p>
                  <Buttons video_button={"videoLangEn"} url={sure.audio.mp3_en} id={sure.id} />
                </p>
              </AccordionDetails>
            </Accordion >
          </>
        ))
      }
    </>
  );
}