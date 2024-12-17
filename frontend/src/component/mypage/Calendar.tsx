import React, { useState } from 'react'
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
} from 'date-fns'
import { ja } from 'date-fns/locale'
import { useQueryDiaryDates } from '../../hooks/useQueryDiaries'

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { data: diaryDates } = useQueryDiaryDates(currentDate)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const getDiaryCount = (date: Date) => {
    if (!diaryDates) return 0
    // 日付をyyyy-MM-dd形式に変換
    const formattedDate = date.toISOString().split('T')[0]
    console.log(formattedDate)
    const found = diaryDates.dates.find((d) => d.date === formattedDate)
    return found ? found.count : 0
  }
  console.log(getDiaryCount(new Date(2024, 12, 0, 0, 0, 0, 0)))

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
        {/* 曜日を表示する */}
        <div className="grid grid-cols-7 gap-1">
          {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
            <div
              key={day}
              className="text-center py-2 text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
          {monthDays.map((day) => (
            <div
              key={format(day, 'yyyy-MM-dd')}
              className={`
                text-center py-2 rounded cursor-pointer
                ${!isSameMonth(day, currentDate) ? 'text-gray-300' : ''}
                ${
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'bg-orange-100'
                    : ''
                }
                ${
                  getDiaryCount(day) > 0
                    ? 'bg-green-100 hover:bg-green-200'
                    : 'hover:bg-gray-100'
                }
              `}
            >
              {format(day, 'd')}
              {getDiaryCount(day) > 0 && (
                <div className="text-xs text-green-600 font-medium">
                  {getDiaryCount(day)}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Calendar
