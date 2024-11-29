import { useEffect } from 'react'
import axios from 'axios'
import { CsrfToken } from '../types'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../component/Auth'
import App from '../App'
import Home from '../pages/Home'
import Diary from '../pages/Diary'
import MusicLibrary from '../pages/MusicLibrary'
import MyPage from '../pages/MyPage'

function AppRoutes() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${import.meta.env.VITE_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/diary" element={<Diary />} /> */}
        <Route path="/" element={<App />}>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="diary" element={<Diary />} />
          <Route path="music" element={<MusicLibrary />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Auth />}>
  //       <Route path="/home" element={<Home />} />
  //       <Route path="diary" element={<Diary />} />
  //       <Route path="music" element={<MusicLibrary />} />
  //       <Route path="mypage" element={<MyPage />} />
  //     </Route>
  //   )
  // )

  // return router
}

export default AppRoutes
