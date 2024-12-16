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

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

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
              className="text-center py-2 text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
          {monthDays.map((day) => (
            <div
              key={format(day, 'yyyy-MM-dd')}
              className={`
                text-center py-2 rounded hover:bg-gray-100 cursor-pointer
                ${!isSameMonth(day, currentDate) ? 'text-gray-300' : ''}
                ${
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'bg-orange-100'
                    : ''
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
