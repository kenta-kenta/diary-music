import Profile from '../component/mypage/Profile'
import Activity from '../component/mypage/Activity'
import Setting from '../component/mypage/Setting'

export default function MyPage() {
  return (
    <div className="container mx-auto p-4 py-20">
      <Profile />
      <Activity />
      <Setting />
    </div>
  )
}
