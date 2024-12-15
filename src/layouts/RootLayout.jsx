import { Outlet, NavLink } from 'react-router-dom';
import Breadcrumps from '../components/Breadcrumbs';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav className='menu'>
          <h1>Quran Verse by Verse. Many Languages</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>         
          <NavLink to="surahs">Surahs</NavLink>         
          <NavLink to="chapters">Chapters</NavLink>
        </nav>
      </header>
      <Breadcrumps />
      <main>
        <Outlet />
      </main>
    </div>
  )
}