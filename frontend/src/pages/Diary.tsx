import { DiaryForm } from '../component/diary/DiaryForm'
import { DiaryHint } from '../component/diary/DiaryHint'
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
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <DiaryForm
          editedDiary={editedDiary}
          updateDiary={updateDiary}
          onSubmit={submitDiaryHandler}
        />
        <DiaryHint />
      </div>
    </div>
  )
}

export default Diary
