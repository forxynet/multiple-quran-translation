import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Buttons from './Buttons';

export default function AccordionPlay(surahs) {

  return (
    <>
      {
        surahs && surahs.surahs.data.map(sure => (
          <>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header">
                {`${sure.name} (${sure.name_original})`}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Buttons name={`(TR) ${sure.name} (${sure.name_original})`} url={sure.audio.mp3} id={sure.id} />
                </Typography>
                <Typography>
                  <Buttons name={`(EN) ${sure.name} (${sure.name_original})`} url={sure.audio.mp3_en} id={sure.id} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </>
        ))
      }
    </>
  );
}