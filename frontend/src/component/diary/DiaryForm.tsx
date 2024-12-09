import { FormEvent } from 'react'
import { EditedDiary } from '../../types'

type DiaryFormProps = {
  editedDiary: EditedDiary
  updateDiary: (diary: EditedDiary) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const DiaryForm: React.FC<DiaryFormProps> = ({
  editedDiary,
  updateDiary,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
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
  )
}
