import { Outlet } from "react-router-dom"

export default function ChaptersLayout() {
  return (
    <div className="chapters-layout">
       <h2>Chapters</h2>
      <Outlet />
    </div>
  )
}
