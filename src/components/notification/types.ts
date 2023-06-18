import { AlertColor } from "@mui/material";

export type NotificationPayload = {
  message: string;
  type: AlertColor;
};

export type NotificationType = NotificationPayload & {
  id: string;
};
