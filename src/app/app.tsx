import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Paths } from "../shared/types";
import { useInitNavigation } from "../shared/navigate";
import { Auth, Register } from "../pages";
import { Stack } from "@mui/material";
import { Container } from "./styles";
import { useGate } from "effector-react";
import { Notification } from "@master_kufa/client-tools";
import { appModel } from "../models";

const AppNavigation = () => {
  useInitNavigation();
  useGate(appModel.AppGate);

  return (
    <Stack sx={Container}>
      <Routes>
        <Route path={Paths.root}>
          <Route index path={Paths.auth} element={<Auth />} />
          <Route path={Paths.register} element={<Register />} />
        </Route>
      </Routes>
    </Stack>
  );
};

export const App = () => (
  <>
    <Notification.Component />
    <BrowserRouter>
      <AppNavigation />
    </BrowserRouter>
  </>
);
