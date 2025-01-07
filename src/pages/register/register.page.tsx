import { useGate, useUnit } from "effector-react";
import { registerModel } from "../../models";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Paths } from "../../shared/types";
import { FormContainer, FormFields } from "shared/styles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { navigation } from "../../shared/navigate";
import { applicationsModel } from "models/applications";

export const Register = () => {
  const loginText = useUnit(registerModel.$loginText);
  const passwordText = useUnit(registerModel.$passwordText);
  const passwordConfirmText = useUnit(registerModel.$passwordConfirmText);
  const registerPending = useUnit(registerModel.$registerPending);
  const loginTextError = useUnit(registerModel.$loginTextError);
  const passwordTextError = useUnit(registerModel.$passwordTextError);
  const application = useUnit(applicationsModel.$application);
  const passwordConfirmTextError = useUnit(
    registerModel.$passwordConfirmTextError
  );

  const actions = {
    registerClicked: useUnit(registerModel.registerClicked),
    loginTextChanged: useUnit(registerModel.loginTextChanged),
    passwordTextChanged: useUnit(registerModel.passwordTextChanged),
    passwordConfirmTextChanged: useUnit(
      registerModel.passwordConfirmTextChanged
    ),
  };

  useGate(registerModel.PageGate);

  return (
    <Paper sx={FormContainer}>
      <Typography variant="h4">Регистрация</Typography>
      <Stack sx={FormFields}>
        <TextField
          name="login"
          label="Логин"
          value={loginText}
          onChange={({ target }) => actions.loginTextChanged(target.value)}
          error={Boolean(loginTextError)}
          helperText={loginTextError}
        />
        <TextField
          name="password"
          type="password"
          label="Пароль"
          value={passwordText}
          onChange={({ target }) => actions.passwordTextChanged(target.value)}
          error={Boolean(passwordTextError)}
          helperText={passwordTextError}
        />
        <TextField
          name="passwordX2"
          type="password"
          label="Подтверждение пароля"
          value={passwordConfirmText}
          onChange={({ target }) =>
            actions.passwordConfirmTextChanged(target.value)
          }
          error={Boolean(passwordConfirmTextError)}
          helperText={passwordConfirmTextError}
        />
        <Button
          endIcon={registerPending && <HourglassTopIcon />}
          variant="outlined"
          onClick={actions.registerClicked}
        >
          Зарегистрироваться
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: 4 }}
          size="small"
          onClick={() => navigation.navigate(`${Paths.auth}#${application}`)}
        >
          Авторизация
        </Button>
      </Stack>
    </Paper>
  );
};
