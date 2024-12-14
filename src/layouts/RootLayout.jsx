import { Outlet, NavLink } from 'react-router-dom';
import Breadcrumps from '../components/Breadcrumbs';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Multible Quran Translation</h1>
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