import Profile from '../component/Profile'
import Activity from '../component/Activity'
import Setting from '../component/Setting'

export default function MyPage() {
  return (
    <div className="container mx-auto p-4 py-20">
      <Profile />
      <Activity />
      <Setting />
    </div>
  )
}
