import { Link } from 'react-router-dom'
import { LibraryBooks } from '@mui/icons-material'

export const DiariesIcon = () => {
  return (
    <div className="w-full sm:w-1/3 px-4">
      <div className="h-full bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2">
        <div className="p-8 flex flex-col items-center">
          <LibraryBooks className="w-12 h-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">日記一覧</h2>
          <Link
            to="/diary"
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            一覧を見る
          </Link>
        </div>
      </div>
    </div>
  )
}
