import React, { useState } from 'react'
import { useQueryDiaryDates } from '../hooks/useQueryDiaries'
import Calendar from '../component/mypage/Calendar'
import Profile from '../component/mypage/Profile'
import Activity from '../component/mypage/Activity'
import Setting from '../component/mypage/Setting'

const MyPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { data: diaryDates } = useQueryDiaryDates(currentDate)

  return (
    <div className="container mx-auto p-4 py-20">
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        diaryDates={diaryDates}
      />
      <Profile />
      <Activity />
      <Setting />
    </div>
  )
}

export default MyPage
