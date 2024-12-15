import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

// layouts
import RootLayout from './layouts/RootLayout';
import ChaptersLayout from './layouts/ChaptersLayout';

// pages
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from './pages/NotFound';
import Chapters, { chaptersLoader } from './pages/chapters/Chapters'
import Editions, { editionsDetailsLoader } from './pages/chapters/Editions'
import ChaptersError from './pages/chapters/ChaptersError'
import Surahs, {loader} from './pages/openquran/Surahs';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* <Route index element={<Home />} />
      <Route path="about" element={<About />} /> */}
      <Route path="Surahs" element={<Surahs />} loader={loader} />
      <Route path="chapters" element={<ChaptersLayout />} errorElement={ChaptersError}>
        <Route
          index          
          element={<Chapters />}
          loader={chaptersLoader}          
        />
        <Route
          path='/chapters/editions/:id'
          element={<Editions />}
          loader={editionsDetailsLoader}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
