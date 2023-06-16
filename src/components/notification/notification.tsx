import { Snackbar, Alert, AlertColor } from "@mui/material";
import React, { useEffect, useState } from "react";

type NotificationProps = {
  message: string;
  type: AlertColor;
  onClose?: () => void;
};

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    message && setIsOpen(true);
  }, [message, type]);

  useEffect(() => onClose, []);

  const onCloseHandler = () => {
    onClose?.();
    setIsOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={onCloseHandler}
    >
      <Alert severity="success">This is a success message!</Alert>
    </Snackbar>
  );
};
