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
              <NavLink to="verses">Ayetler</NavLink>
              <NavLink to="surahs">Sûreler</NavLink>
            </div>
          </div>
        </nav>
      </header>
      <Breadcrumps />
      <main>
        <Outlet />
      </main>
    </div>
  )
}