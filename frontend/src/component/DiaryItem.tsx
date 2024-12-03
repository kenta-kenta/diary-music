import { FC, memo } from 'react'
import { Diary } from '../types'
import useStore from '../store'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { PencilIcon, TrashIcon } from 'lucide-react'

const DiaryItemMemo: FC<Omit<Diary, 'created_at' | 'updated_at'>> = ({
  id,
  content,
}) => {
  const updateDiary = useStore((state) => state.updateEditedDiary)
  const { deleteDiaryMutation } = useMutateDiary()
  return (
    <li className="my-3">
      <span>{content}</span>
      <div>
        <PencilIcon
          className="w-5 h-5 inline-block"
          onClick={() => updateDiary({ id, content })}
        />
        <TrashIcon
          className="w-5 h-5 inline-block"
          onClick={() => deleteDiaryMutation.mutate(id)}
        />
      </div>
    </li>
  )
}

export const DiaryItem = memo(DiaryItemMemo)
