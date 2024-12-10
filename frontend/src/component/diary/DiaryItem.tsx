import { FC, memo, useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutateDiary } from '../../hooks/useMutateDiary'
import { Diary } from '../../types'
import { Modal, Box, Card } from '@mui/material'
import useStore from '../../store'

const DiaryItemMemo: FC<Omit<Diary, 'updated_at'>> = ({
  id,
  content,
  created_at,
}) => {
  const { editedDiary } = useStore()
  const updateDiary = useStore((state) => state.updateEditedDiary)
  const { updateDiaryMutation, deleteDiaryMutation } = useMutateDiary()

  // 日付のフォーマット処理
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const EditDiaryHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 最新のeditedDiaryの内容を使用
    updateDiaryMutation.mutate({
      id: id,
      content: editedDiary.content, // ここを変更
    })
    handleClose()
  }

  return (
    <>
      <li className="my-3">
        <Card className="p-3">
          <div className="whitespace-pre-wrap break-words">{content}</div>
          <div className="flex justify-end space-x-2">
            <PencilIcon
              className="w-5 h-5 text-orange-500 cursor-pointer hover:text-orange-600"
              onClick={() => handleOpen()}
            />
            <TrashIcon
              className="w-5 h-5 text-orange-500 cursor-pointer hover:text-orange-600"
              onClick={() => deleteDiaryMutation.mutate(id)}
            />
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {formatDate(created_at)}
            </span>
          </div>
        </Card>
      </li>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <form onSubmit={EditDiaryHandler}>
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                updateDiary({ ...editedDiary, content: e.target.value })
              }
              defaultValue={content}
            />
            <button
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-500 text-white"
              type="submit"
            >
              Update
            </button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export const DiaryItem = memo(DiaryItemMemo)
