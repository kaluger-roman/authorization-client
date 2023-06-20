import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Paths } from "../shared/types";
import { useInitNavigation } from "../shared/navigate";
import { Auth, Register } from "../pages";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { Container } from "./styles";
import { useGate, useUnit } from "effector-react";
import { Notification, socket } from "@master_kufa/client-tools";
import { appModel } from "../models";

const AppNavigation = () => {
  const isSocketConnected = useUnit(socket.$isConnected);
  useInitNavigation();
  useGate(appModel.AppGate);

  return (
    <Stack sx={Container}>
      <Backdrop open={!isSocketConnected}>
        <CircularProgress />
      </Backdrop>
      <Notification.Component />
      <Routes>
        <Route path={Paths.auth} element={<Auth />} />
        <Route path={Paths.register} element={<Register />} />
      </Routes>
    </Stack>
  );
};

export const App = () => (
  <BrowserRouter>
    <AppNavigation />
  </BrowserRouter>
);
