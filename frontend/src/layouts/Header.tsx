import { Create, LibraryBooks, Logout, Person } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { useMutateAuth } from '../hooks/useMutateAuth'

Modal.setAppElement('#root')

export default function Header(props: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-orange-50 shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-orange-600 hover:text-orange-700">
              <Link to="/home">日記アプリ</Link>
            </h1>
            {props.isLogin && (
              <>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <MenuIcon className="h-6 w-6" />
                </button>
                <nav className="hidden md:block">
                  <ul className="flex flex-row space-x-6">
                    <li className="flex items-center text-orange-600 hover:text-orange-700">
                      <Link to="/diary">
                        <Create className="h-5 w-5 mr-2" />
                        <span>日記を書く</span>
                      </Link>
                    </li>
                    <li className="flex items-center text-orange-600 hover:text-orange-700">
                      <Link to="/diaries">
                        <LibraryBooks className="h-5 w-5 mr-2" />
                        <span>今までの日記</span>
                      </Link>
                    </li>
                    <li className="flex items-center text-orange-600 hover:text-orange-700">
                      <Link to="/mypage">
                        <Person className="h-5 w-5 mr-2" />
                        <span>マイページ</span>
                      </Link>
                    </li>
                    <li className="flex items-center text-orange-600 hover:text-orange-700">
                      <Logout onClick={logout} className="h-5 w-5 mr-2" />
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
        {props.isLogin && (
          <Modal
            isOpen={isMenuOpen}
            onRequestClose={() => setIsMenuOpen(!isMenuOpen)}
            className="relative fixed top-5 right-0 bg-white p-4 flex justify-end"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <ul className="flex flex-col space-y-4 mt-10">
              <li className="flex items-center text-orange-600 hover:text-orange-700">
                <Link to="/diary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Create className="h-5 w-5 mr-2" />
                  <span>日記を書く</span>
                </Link>
              </li>
              <li className="flex items-center text-orange-600 hover:text-orange-700">
                <Link to="/diaries" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <LibraryBooks className="h-5 w-5 mr-2" />
                  <span>今までの日記</span>
                </Link>
              </li>
              <li className="flex items-center text-orange-600 hover:text-orange-700">
                <Link to="/mypage" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Person className="h-5 w-5 mr-2" />
                  <span>マイページ</span>
                </Link>
              </li>
              <li className="flex items-center text-orange-600 hover:text-orange-700">
                <Link to="/" onClick={logout}>
                  <Logout className="h-5 w-5 mr-2" />
                  <span>ログアウト</span>
                </Link>
              </li>
            </ul>
          </Modal>
        )}
      </header>
    </>
  )
}
