import { useQueryDiaries } from '../hooks/useQueryDiaries'
import { useMutateDiary } from '../hooks/useMutateDiary'
import useStore from '../store'
import { FormEvent } from 'react'
import { ShieldCheckIcon } from 'lucide-react'
import { DiaryItem } from '../component/DiaryItem'

const Diary = () => {
  const { editedDiary } = useStore()
  const updateDiary = useStore((state) => state.updateEditedDiary)
  const { data, isLoading } = useQueryDiaries()
  const { createDiaryMutation, updateDiaryMutation } = useMutateDiary()

  const submitDiaryHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedDiary.id === 0) {
      createDiaryMutation.mutate({
        content: editedDiary.content,
      })
    } else {
      updateDiaryMutation.mutate(editedDiary)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={submitDiaryHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <textarea
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="content ?"
            onChange={(e) =>
              updateDiary({ ...editedDiary, content: e.target.value })
            }
            value={editedDiary.content || ''}
          />
          <button
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="submit"
            disabled={!editedDiary.content}
          >
            {editedDiary.id === 0 ? 'Create' : 'Update'}
          </button>
        </form>
        {isLoading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {data.map((diary) => (
              <DiaryItem key={diary.id} id={diary.id} content={diary.content} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 my-4">
            日記のデータがありません
          </p>
        )}
        <div>
          <ShieldCheckIcon className="w-5 h-5 inline-block" />
          <span className="text-gray-700 text-3xl">
            Diary app by React/Go(echo)
          </span>
        </div>
      </div>
    </div>
  )
}

export default Diary
