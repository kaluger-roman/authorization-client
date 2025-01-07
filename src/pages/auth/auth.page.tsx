import { useGate, useUnit } from "effector-react";
import { authModel } from "../../models";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Paths } from "../../shared/types";
import { FormContainer, FormFields } from "shared/styles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { navigation } from "../../shared/navigate";
import { PasswordStyles } from "./auth.styles";
import { useAppSelect } from "./hooks";
import { AppBackButton } from "components";

export const Auth = () => {
  const loginText = useUnit(authModel.$loginText);
  const passwordText = useUnit(authModel.$passwordText);
  const isEmptyFields = useUnit(authModel.$isEmptyFields);
  const authPending = useUnit(authModel.$authPending);

  const actions = {
    authClicked: useUnit(authModel.authClicked),
    loginTextChanged: useUnit(authModel.loginTextChanged),
    passwordTextChanged: useUnit(authModel.passwordTextChanged),
  };

  useGate(authModel.PageGate);

  useAppSelect();

  return (
    <Paper sx={FormContainer}>
      <Typography variant="h4">Авторизация</Typography>
      <Stack sx={FormFields}>
        <TextField
          type="text"
          label="Логин"
          value={loginText}
          onChange={({ target }) => actions.loginTextChanged(target.value)}
        />
        <TextField
          type="text"
          InputProps={{ sx: PasswordStyles }}
          label="Пароль"
          value={passwordText}
          onChange={({ target }) => actions.passwordTextChanged(target.value)}
        />
        <Button
          endIcon={authPending && <HourglassTopIcon />}
          disabled={isEmptyFields}
          variant="outlined"
          onClick={actions.authClicked}
        >
          Вход
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: 4 }}
          size="small"
          onClick={() => navigation.navigate(Paths.register)}
        >
          К Регистрации
        </Button>
        <AppBackButton />
      </Stack>
    </Paper>
  );
};
