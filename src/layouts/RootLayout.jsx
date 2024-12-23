import { Outlet, NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
//import Breadcrumps from '../components/Breadcrumbs';



export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <div>
            <div>
              <h1>
                <Typography variant="label" color="common.white">
                  Kuran Tercümesi
                </Typography>
              </h1>
              <NavLink className='palette.text.primary' to="searchverses" >
                <Typography variant="label" color="common.white">
                  Ayetleri Ara
                </Typography>
              </NavLink>
              <NavLink className='palette.text.primary' to="verses">
                <Typography variant="label" color="common.white">
                  Sûre Oku
                </Typography>
              </NavLink>
              <NavLink className='palette.text.primary' to="surahs">
                <Typography variant="label" color="common.white">
                  Sûre Dinle
                </Typography>
              </NavLink>
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