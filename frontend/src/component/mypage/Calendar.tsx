import { FC } from 'react'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
  addDays,
  startOfWeek,
  endOfWeek,
} from 'date-fns'
import { ja } from 'date-fns/locale'

type CalendarProps = {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  diaryDates?: {
    dates: {
      date: string
      count: number
    }[]
  }
}

const Calendar: FC<CalendarProps> = ({
  currentDate,
  setCurrentDate,
  diaryDates,
}) => {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { locale: ja })
  const calendarEnd = endOfWeek(monthEnd, { locale: ja })

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const getDiaryCount = (date: Date) => {
    if (!diaryDates) return 0
    if (!diaryDates.dates) return 0
    // 日付をyyyy-MM-dd形式に変換
    const formattedDate = date.toISOString().split('T')[0]
    const found = diaryDates.dates.find((d) => d.date === formattedDate)
    return found ? found.count : 0
  }

  return (
    <Card className="my-4 bg-white shadow-md rounded">
      <CardHeader
        title="カレンダー"
        action={
          <div className="flex space-x-2">
            <IconButton onClick={handlePrevMonth}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNextMonth}>
              <ChevronRight />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <div className="text-center mb-4 text-xl font-semibold text-gray-800">
          {format(currentDate, 'yyyy年 MM月', { locale: ja })}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
            <div
              key={day}
              className="text-center h-8 flex items-center justify-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day) => (
            <div
              key={format(addDays(day, 1), 'yyyy-MM-dd')}
              className={`
                text-center h-12 w-full rounded cursor-pointer
                flex flex-col justify-center items-center
                ${!isSameMonth(day, currentDate) ? 'text-gray-300' : ''}
                ${
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'bg-orange-200 hover:bg-orange-300'
                    : ''
                }
                ${
                  getDiaryCount(addDays(day, 1)) > 0
                    ? 'bg-orange-100 hover:bg-orange-200'
                    : 'hover:bg-gray-100'
                }
              `}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Calendar
