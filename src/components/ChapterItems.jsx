const ChapterItems = (data) => {
  //console.log(data)
  return (
    <>
      <p>{`[${data.verse}] ${data.text}.`}</p>
    </>
  )
}


export default ChapterItems;