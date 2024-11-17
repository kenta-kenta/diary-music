import React from "react";
import { Book, MusicNote } from "@mui/icons-material";
import { Card, CardContent, CardHeader } from "@mui/material";

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

const Activity: React.FC = () => {
  return (
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
  );
};

export default Activity;
