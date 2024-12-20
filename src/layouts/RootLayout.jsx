import { Outlet, NavLink } from 'react-router-dom';
import Breadcrumps from '../components/Breadcrumbs';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <div>
            <div>
              <h1>Kuran Tercümesi</h1>
              <NavLink to="searchverses">Ayetleri Ara</NavLink>
              <NavLink to="verses">Sûre Oku</NavLink>
              <NavLink to="surahs">Sûre Dinle</NavLink>
            </div>
          </div>
        </nav>
      </header>
      {/* <Breadcrumps /> */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}