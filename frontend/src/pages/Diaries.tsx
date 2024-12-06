import { useQueryDiaries } from '../hooks/useQueryDiaries'
import { DiaryItem } from '../component/DiaryItem'

const Diaries = () => {
  const { data, isLoading } = useQueryDiaries()

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-orange-600">
          今までの日記
        </h1>
        <div className="mb-16">
          {' '}
          {/* フッター用の余白 */}
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : data && data.length > 0 ? (
            <ul className="space-y-4">
              {data.map((diary) => (
                <DiaryItem
                  key={diary.id}
                  id={diary.id}
                  content={diary.content}
                  created_at={diary.created_at}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 my-4">
              日記のデータがありません
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Diaries
