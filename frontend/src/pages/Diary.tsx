import { useMutateDiary } from '../hooks/useMutateDiary'
import useStore from '../store'
import { FormEvent } from 'react'

const Diary = () => {
  const { editedDiary } = useStore()
  const updateDiary = useStore((state) => state.updateEditedDiary)
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
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={submitDiaryHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="今日はどんな1日だった？"
            onChange={(e) =>
              updateDiary({ ...editedDiary, content: e.target.value })
            }
            value={editedDiary.content || ''}
          />
          <button
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-500 text-white"
            type="submit"
            disabled={!editedDiary.content}
          >
            作成する
          </button>
        </form>
        <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-orange-600 mb-4">
            書き方のヒント
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center space-x-2">
              <span className="text-orange-500">1.</span>
              <p>実際にあったことを書いてみよう</p>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-orange-500">2.</span>
              <p>そのことから感じた気持ちを書いてみよう</p>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-orange-500">3.</span>
              <p>その日の天気を書いてみよう</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Diary
