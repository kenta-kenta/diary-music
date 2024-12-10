import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Switch,
  Typography,
} from "@mui/material";

const Setting: React.FC = () => {
  return (
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
  );
};

export default Setting;
