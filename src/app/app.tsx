import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "../shared/types";
import { useInitNavigation } from "../shared/navigate";
import { Applications, Auth, Register } from "../pages";
import { Stack, ThemeProvider } from "@mui/material";
import { Container } from "./styles";
import { useGate } from "effector-react";
import { Baseline, Notification, theme } from "@master_kufa/client-tools";
import { appModel } from "../models";

const AppNavigation = () => {
  useInitNavigation();
  useGate(appModel.AppGate);

  return (
    <ThemeProvider theme={theme}>
      <Baseline />
      <Stack sx={Container}>
        <Routes>
          <Route path={Paths.root}>
            <Route
              path={Paths.root}
              element={<Navigate to={Paths.applications} />}
            />
            <Route index path={Paths.applications} element={<Applications />} />
            <Route path={Paths.auth} element={<Auth />} />
            <Route path={Paths.register} element={<Register />} />
          </Route>
        </Routes>
      </Stack>
    </ThemeProvider>
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
