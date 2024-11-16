import { Book, MusicNote } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Switch,
  Typography,
  Avatar,
} from "@mui/material";

const userData = {
  name: "山田 花子",
  email: "hanako@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  stats: {
    diariesWritten: 42,
    musicGenerated: 38,
  },
  recentActivity: [
    { type: "diary", title: "今日の出来事", date: "2024-03-15" },
    { type: "music", title: "穏やかな朝の曲", date: "2024-03-14" },
    { type: "diary", title: "友達との思い出", date: "2024-03-12" },
  ],
};

export default function MyPage() {
  return (
    <div className="container mx-auto p-4 pt-20 pb-24">
      <Card className="mb-4 bg-white shadow-md rounded">
        <CardHeader title="プロフィール" />
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar
              src={userData.avatar}
              alt={userData.name}
              className="w-16 h-16"
            />
            <div>
              <Typography variant="h6">{userData.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {userData.email}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4 bg-white shadow-md rounded">
        <CardHeader title="アクティビティ" />
        <CardContent>
          <ul className="space-y-4">
            {userData.recentActivity.map((activity, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  {activity.type === "diary" ? (
                    <Book className="h-5 w-5 mr-2 text-orange-600" />
                  ) : (
                    <MusicNote className="h-5 w-5 mr-2 text-orange-600" />
                  )}
                  <span>{activity.title}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md rounded">
        <CardHeader title="設定" />
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography>ダークモード</Typography>
            <Switch />
          </div>
          <div className="flex justify-between items-center">
            <Typography>通知</Typography>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
