import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';

export default function MenuPlay(surahs) {

  //console.log(surahs)

  const handleChange = (e) => {


    //console.log(selelctedSureId)
    //console.log(surahs)

    const id = e.target.value;
    console.log('id ' + id)
    //surahs.surahs.data[id].map(item => {

    // console.log(item)
    //console.log('item id:' + item.id)
    //console.log('id: ' + id)

    console.log(surahs.surahs.data[id])

    const mp3 = surahs.surahs.data[(id - 1)].audio.mp3;
    const mp3_en = surahs.surahs.data[(id - 1)].audio.mp3_en;

    console.log('mp3 ' + mp3);
    console.log('mp3_en ' + mp3_en)
    //})
  }

  return (
    <div className="select">
      <select value={surahs.surahs.id} onChange={handleChange}>
        <>
          <option key="0">Bir sûre seçiniz...</option>
          {surahs && surahs.surahs.data.map((sure) => (
            <option key={sure.id} value={sure.id}>{sure.name}</option>
          ))}
        </>
      </select>
    </div>
  );
}
