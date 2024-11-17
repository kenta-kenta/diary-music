import Profile from "../component/Profile";
import Activity from "../component/Activity";
import Setting from "../component/Setting";

export default function MyPage() {
  return (
    <div className="container mx-auto p-4 pt-20 pb-24">
      <Profile />
      <Activity />
      <Setting />
    </div>
  );
}
