import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
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

const Profile: React.FC = () => {
  return (
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
  );
};

export default Profile;
