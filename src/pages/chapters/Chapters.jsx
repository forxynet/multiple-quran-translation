import { Link, useLoaderData } from 'react-router-dom'
import { chaptersTr } from '../../data/chapters/tr'

export default function Chapters() {
  const chapters = useLoaderData();

  return (
    <div className='chapters'>
      {chapters.map(chapter => (
        <Link to={`editions/${chapter.id.toString()}`} key={chapter.id}>
          <p>{`${chapter.translation} (${chapter.transliteration})`}</p>
          <p>{chapter.type}</p>
          <p>{chapter.name}</p>
          <p>{chapter.total_verses}</p>
        </Link>
      ))}
    </div>
  )
}

export const chaptersLoader = async () => {
  return chaptersTr;
}