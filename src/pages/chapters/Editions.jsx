import { useLoaderData } from 'react-router-dom'
import { editionsTr } from '../../data/editions/tr'

export default function Editions() {
  const edition = useLoaderData()


  return (
    <div className='chapters-details'>
      {
        edition.map((data, index) => (

          <p key={index}>{`[${data.verse}] ${data.text}.`}</p>
        ))
      }
    </div>
  )
}


export const editionsDetailsLoader = async ({ params }) => {
  const { id } = params

  let detailData = null;

  editionsTr.find((value) => {
    detailData = value[id];
  });

  return detailData;
}
