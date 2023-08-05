import { useGate, useUnit } from "effector-react";
import { registerModel } from "../../models";
import {
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Paths } from "../../shared/types";
import { FormContainer, FormFields } from "shared/styles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { navigation } from "../../shared/navigate";

export const Register = () => {
  const loginText = useUnit(registerModel.$loginText);
  const passwordText = useUnit(registerModel.$passwordText);
  const passwordConfirmText = useUnit(registerModel.$passwordConfirmText);
  const registerPending = useUnit(registerModel.$registerPending);
  const loginTextError = useUnit(registerModel.$loginTextError);
  const passwordTextError = useUnit(registerModel.$passwordTextError);
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
      <Typography variant="h4">Registration</Typography>
      <Stack sx={FormFields}>
        <TextField
          label="Login"
          value={loginText}
          onChange={({ target }) => actions.loginTextChanged(target.value)}
          error={Boolean(loginTextError)}
          helperText={loginTextError}
        />
        <TextField
          type="password"
          label="Password"
          value={passwordText}
          onChange={({ target }) => actions.passwordTextChanged(target.value)}
          error={Boolean(passwordTextError)}
          helperText={passwordTextError}
        />
        <TextField
          type="password"
          label="Password Confirmation"
          value={passwordConfirmText}
          onChange={({ target }) =>
            actions.passwordConfirmTextChanged(target.value)
          }
          error={Boolean(passwordConfirmTextError)}
          helperText={passwordConfirmTextError}
        />
        <Button
          endIcon={registerPending && <HourglassTopIcon />}
          variant="contained"
          onClick={actions.registerClicked}
        >
          Sign up
        </Button>
        <Chip
          clickable
          onClick={() => navigation.navigate(Paths.auth)}
          label="Authorization"
        />
      </Stack>
    </Paper>
  );
};
