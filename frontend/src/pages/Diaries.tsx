import { useQueryDiaries } from '../hooks/useQueryDiaries'
import { DiaryItem } from '../component/DiaryItem'

const Diaries = () => {
  const { data, isLoading } = useQueryDiaries()

  return (
    <>
      <h1 className="text-2xl font-bold mt-20 text-center text-orange-600">
        今までの日記
      </h1>
      <div className="m-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 ? (
          <ul className="mt-4 space-y-2">
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
    </>
  )
}

export default Diaries
