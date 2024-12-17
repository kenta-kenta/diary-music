import { useState, useEffect } from 'react'
import { useQueryDiaries } from '../hooks/useQueryDiaries'
import { DiaryItem } from '../component/diary/DiaryItem'

const Diaries = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQueryDiaries(page)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [page])

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-orange-600">
          今までの日記
        </h1>
        <div className="mb-16">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : data?.data && data.data.length > 0 ? (
            <>
              <ul className="space-y-4">
                {data.data.map((diary) => (
                  <DiaryItem
                    key={diary.id}
                    id={diary.id}
                    content={diary.content}
                    created_at={diary.created_at}
                  />
                ))}
              </ul>
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 hover:bg-orange-600 transition-colors"
                >
                  前へ
                </button>
                <span className="text-gray-600">
                  {page} / {data.total_pages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.total_pages, p + 1))
                  }
                  disabled={page === data.total_pages}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 hover:bg-orange-600 transition-colors"
                >
                  次へ
                </button>
              </div>
            </>
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
