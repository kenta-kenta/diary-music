import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Diary from "../component/Diary";
import MusicLibrary from "../component/MusicLibrary";
import MyPage from "../component/MyPage";
import App from "../App.tsx";
import Home from "../pages/Home.tsx";

const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="diary" element={<Diary />} />
      <Route path="music" element={<MusicLibrary />} />
      <Route path="mypage" element={<MyPage />} />
    </Route>
  )
);

export default routesBasic;
