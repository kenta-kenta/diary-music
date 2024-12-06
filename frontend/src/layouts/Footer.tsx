import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bottom-0 w-full bg-orange-50 text-orange-600 p-4 text-center shadow-md">
      <div className="flex justify-center space-x-8 pb-2">
        <Link to="/diary" className="hover:text-orange-800 transition-colors">
          日記を書く
        </Link>
        <Link to="/diaries" className="hover:text-orange-800 transition-colors">
          今までの日記
        </Link>
        <Link to="/mypage" className="hover:text-orange-800 transition-colors">
          マイページ
        </Link>
      </div>
      <p>&copy; 2024 日記アプリ</p>
    </footer>
  )
}

export default Footer
