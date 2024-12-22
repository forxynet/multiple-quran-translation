import { Outlet, NavLink } from 'react-router-dom';
//import Breadcrumps from '../components/Breadcrumbs';



export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <div>
            <div>
              <h1 className='dark:text-white' >Kuran Tercümesi</h1>
              <NavLink className='dark:text-white' to="searchverses" >Ayetleri Ara</NavLink>
              <NavLink className='dark:text-white' to="verses">Sûre Oku</NavLink>
              <NavLink className='dark:text-white' to="surahs">Sûre Dinle</NavLink>
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