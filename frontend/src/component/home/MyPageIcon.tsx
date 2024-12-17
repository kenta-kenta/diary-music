import { Link } from 'react-router-dom'
import { Person } from '@mui/icons-material'

export const MyPageIcon = () => {
  return (
    <div className="w-full md:w-1/3 p-2 md:p-4">
      <div className="h-full bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2">
        <div className="p-4 md:p-8 flex flex-col items-center">
          <Person className="w-8 h-8 md:w-12 md:h-12 text-orange-500 mb-2 md:mb-4" />
          <h2 className="text-lg md:text-xl font-medium mb-2 md:mb-4">
            マイページ
          </h2>
          <Link
            to="/mypage"
            className="mt-2 md:mt-4 px-4 md:px-6 py-1 md:py-2 bg-orange-500 text-white text-sm md:text-base rounded-lg hover:bg-orange-600 transition-colors"
          >
            移動する
          </Link>
        </div>
      </div>
    </div>
  )
}
