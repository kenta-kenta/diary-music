import { DiaryIcon } from '../component/home/DiaryIcon'
import { DiariesIcon } from '../component/home/DiariesIcon'
import { MyPageIcon } from '../component/home/MyPageIcon'

const Home = () => {
  return (
    <div className="min-h-screen bg-orange-50/30">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* ヘッダーセクション */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-6">
            ようこそ
          </h1>
          <p className="text-lg md:text-xl text-center text-gray-600">
            毎日の思い出を日記に残しましょう
          </p>
        </div>

        {/* アイコングリッド */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-2 max-w-7xl mx-auto">
          <DiaryIcon />
          <DiariesIcon />
          <MyPageIcon />
        </div>
      </div>
    </div>
  )
}

export default Home
